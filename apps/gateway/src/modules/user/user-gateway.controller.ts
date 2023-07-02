import { Controller, Get } from "@nestjs/common";
import { IGatewayResponse } from "../../common/interface/gateway.interface";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { Auth, CurrentUser } from "@app/authentication";

@Controller({
    path: '/users',
    version: '1'
})
@Auth()
export class UserGatewayController {
    @Get('/me')
    async getSelf(@CurrentUser() user: UserEntity): Promise<IGatewayResponse<UserEntity>> {
        return {
            state: true,
            data: user
        };
    }
}