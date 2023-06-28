import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "apps/user/src/interface/role.interface";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorator/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        const { user } = context.switchToHttp().getRequest();

        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}