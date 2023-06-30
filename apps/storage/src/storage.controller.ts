import { Controller, Get } from '@nestjs/common';
import { StorageService } from './service/storage.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { STORAGE_MESSAGE_PATTERNS } from './constant/storage-patterns.constant';
import { IServiceResponse } from '@app/rabbit';
import { StorageFileEntity } from './entity/storage-file.entity';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { UserEntity } from 'apps/user/src/entity/user.entity';

@Controller()
export class StorageController {
  constructor(
    private storageService: StorageService
  ) { }

  @MessagePattern(STORAGE_MESSAGE_PATTERNS.CREATE)
  async createStorageFile(
    @Payload('createDto') createDto: CreateStorageFileDto,
    @Payload('user') user?: UserEntity
  ): Promise<IServiceResponse<StorageFileEntity>> {
    return await this.storageService.create(createDto, user);
  }
}
