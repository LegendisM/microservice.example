import { ForcedSubject, InferSubjects } from "@casl/ability";

export type PolicySubjects = InferSubjects<ForcedSubject<'UserEntity' | 'VehicleEntity'>> | 'all';

export enum PolicyAction {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}