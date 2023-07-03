import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user.dto";
import { StorageFileEntity } from "apps/storage/src/entity/storage-file.entity";

export class UpdateUserDto extends IntersectionType(
    OmitType(
        PartialType(BaseUserDto),
        ['id']
    )
) {
    avatar?: StorageFileEntity;
}