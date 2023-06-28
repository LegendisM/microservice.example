import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { PolicyAction, PolicySubjects } from "./interface/policy.interface";
import { Role } from "apps/user/src/interface/role.interface";

@Injectable()
export class PolicyFactory {
    userAbility(user: UserEntity) {
        const { can, build } = new AbilityBuilder<PureAbility<[PolicyAction, PolicySubjects]>>(
            createMongoAbility
        );

        can([PolicyAction.Read, PolicyAction.Update], 'VehicleEntity', { 'user.id': user.id });

        if (user.roles.includes(Role.ADMIN)) {
            can(PolicyAction.Manage, 'all');
        }

        if (user.roles.includes(Role.OWNER)) {
            can(PolicyAction.Manage, 'all');
        }

        return build();
    }
}