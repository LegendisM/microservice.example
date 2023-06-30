import { DatabaseType } from "typeorm";
import { Database } from "../interface/database.interface";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { AuthRequestEntity } from "apps/auth/src/entity/auth-request.entity";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";
import { StorageFileEntity } from "apps/storage/src/entity/storage-file.entity";

export const DATABASE_CONFIG: Record<Database, { type: DatabaseType, env: string, entities: EntityClassOrSchema[] }> = {
    primary: {
        type: 'postgres',
        env: 'PRIMARY',
        entities: [
            UserEntity,
            AuthRequestEntity,
            VehicleEntity,
            StorageFileEntity
        ]
    },
    secondary: {
        type: 'postgres',
        env: 'SECONDARY',
        entities: []
    }
};