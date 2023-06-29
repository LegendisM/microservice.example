import { ForbiddenException, Injectable } from "@nestjs/common";
import { PolicyFactory } from "./policy.factory";
import { PolicyAction } from "./interface/policy.interface";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";
import { subject } from "@casl/ability";

@Injectable()
export class PolicyService {
    constructor(
        private policyFactory: PolicyFactory
    ) { }

    forVehicle(
        action: PolicyAction,
        user: UserEntity,
        vehicle: VehicleEntity,
        exception: boolean
    ): boolean {
        const state = this.policyFactory.userAbility(user).can(action, subject('VehicleEntity', vehicle));
        if (exception && !state) {
            throw new ForbiddenException();
        }
        return state;
    }
}