import { AbilityBuilder, createMongoAbility, MatchConditions, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { PolicyAction, PolicySubjects } from "./interface/policy.interface";
import { Role } from "apps/user/src/interface/role.interface";
import { UserEntity } from "apps/user/src/entity/user.entity";

export type AppAbility = PureAbility<[PolicyAction, PolicySubjects]>;

@Injectable()
export class PolicyFactory {
    userAbility(user: UserEntity) {
        const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

        can([PolicyAction.Read, PolicyAction.Update], 'VehicleEntity', { userId: user.id });

        if (user.roles.includes(Role.ADMIN)) {
            can(PolicyAction.Manage, 'all');
        }

        if (user.roles.includes(Role.OWNER)) {
            can(PolicyAction.Manage, 'all');
        }

        return build();
    }
}