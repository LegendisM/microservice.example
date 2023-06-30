import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { StorageFileBucket, StorageFileDriverType, StorageFileType } from "../interface/storage-file.interface";

export class BaseStorageFileDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 30
    })
    title: string;

    @ApiProperty({
        enum: StorageFileType
    })
    @IsEnum(StorageFileType)
    type: StorageFileType;

    @ApiProperty({
        enum: StorageFileDriverType,
        default: StorageFileDriverType.S3
    })
    @IsEnum(StorageFileDriverType)
    driver: StorageFileDriverType;

    @ApiProperty({
        enum: StorageFileBucket,
        default: StorageFileBucket.PRIMARY_BUCKET
    })
    @IsEnum(StorageFileBucket)
    bucket: StorageFileBucket;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    key: string;
}