import { InferSubjects } from "@casl/ability";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";

export type PolicySubjects = InferSubjects<typeof UserEntity | typeof VehicleEntity> | 'UserEntity' | 'VehicleEntity' | 'all';

export enum PolicyAction {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}