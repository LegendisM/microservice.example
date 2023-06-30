import { IServiceResponse } from "@app/rabbit";
import { StorageFileDriverType, StorageFileBucket, StorageFileType } from "../interface/storage-file.interface";

export abstract class StorageFileDriver {
    abstract type: StorageFileDriverType;
    abstract upload(
        file: Express.Multer.File,
        type: StorageFileType,
        bucket: StorageFileBucket,
    ): Promise<IServiceResponse<{ key: string }>>;
}