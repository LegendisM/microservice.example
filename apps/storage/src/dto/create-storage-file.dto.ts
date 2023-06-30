import { ApiProperty, PickType } from "@nestjs/swagger";
import { BaseStorageFileDto } from "./base-storage-file.dto";

export class CreateStorageFileDto extends PickType(
    BaseStorageFileDto,
    ['title', 'type', 'driver', 'bucket']
) {
    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    file: Express.Multer.File;
}