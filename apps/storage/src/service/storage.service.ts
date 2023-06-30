import _ from 'lodash';
import { IServiceResponse } from '@app/rabbit';
import { Injectable } from '@nestjs/common';
import { CreateStorageFileDto } from '../dto/create-storage-file.dto';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { StorageFileEntity } from '../entity/storage-file.entity';
import { StorageFileDriverType } from '../interface/storage-file.interface';
import { StorageFileDriver } from '../class/storage-file-driver.class';
import { StorageFileS3DriverService } from './driver/storage-file-s3-driver.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Database } from '@app/database';

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(StorageFileEntity, Database.PRIMARY) private storageFileRepository: Repository<StorageFileEntity>,
        private s3DriverService: StorageFileS3DriverService
    ) { }

    async create(
        createDto: CreateStorageFileDto,
        user?: UserEntity
    ): Promise<IServiceResponse<StorageFileEntity>> {
        let result;
        const file = this.storageFileRepository.create(_.omit(createDto, ['file']));
        const driver = await this.findDriver(createDto.driver);
        const { state, data: { key }, message } = await driver.upload(createDto.file, createDto.type, createDto.bucket);
        if (user) {
            file.user = user;
        }
        if (state) {
            file.key = key;
            result = await this.storageFileRepository.save(file);
        }
        return {
            state: !!result,
            data: result,
            message
        };
    }

    async findDriver(type: StorageFileDriverType): Promise<StorageFileDriver> {
        let driver: StorageFileDriver;

        switch (type) {
            case StorageFileDriverType.S3:
                driver = this.s3DriverService;
                break;
            default:
                driver = this.s3DriverService;
                break;
        }

        return driver;
    }
}
