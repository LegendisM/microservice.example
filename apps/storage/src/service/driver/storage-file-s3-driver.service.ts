import _ from "lodash";
import { Injectable } from "@nestjs/common";
import { StorageFileDriver } from "../../class/storage-file-driver.class";
import { InjectS3, S3 } from "nestjs-s3";
import { IServiceResponse } from "@app/rabbit";
import { StorageFileDriverType, StorageFileBucket, StorageFileType } from "../../interface/storage-file.interface";

@Injectable()
export class StorageFileS3DriverService extends StorageFileDriver {
    type: StorageFileDriverType = StorageFileDriverType.S3;

    constructor(
        @InjectS3() private s3Service: S3,
    ) {
        super();
    }

    async upload(
        file: Express.Multer.File,
        type: StorageFileType,
        bucket: StorageFileBucket,
    ): Promise<IServiceResponse<{ key: string }>> {
        let state, message;
        const key = _.uniqueId(file.originalname);

        await this.s3Service.PatchObject({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            Tagging: type,
            Metadata: { mime: file.mimetype }
        }).then(() => {
            state = true;
            message = 'operation successfully completed';
        }).catch(() => {
            state = false;
            message = 'operation failed';
        });

        return {
            state,
            data: { key: key },
            message
        };
    }
}
