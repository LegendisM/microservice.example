import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "apps/user/src/interface/role.interface";
import { Auth } from "./auth.decorator";
import { RolesGuard } from "../guard/roles.guard";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        Auth(),
        UseGuards(RolesGuard)
    );
};