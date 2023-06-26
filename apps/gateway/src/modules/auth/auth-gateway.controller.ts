import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { Body, ConflictException, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { StartAuthDto } from "apps/auth/src/dto/start-auth.dto";
import { firstValueFrom } from "rxjs";
import { AuthRequestEntity } from "apps/auth/src/entity/auth-request.entity";
import { AUTH_MESSAGE_PATTERNS } from "apps/auth/src/constant/auth-patterns.constant";
import { I18n, I18nContext } from "nestjs-i18n";
import { ValidateAuthDto } from "apps/auth/src/dto/validate-auth.dto";
import { USER_MESSAGE_PATTERNS } from "apps/user/src/constant/user-patterns.constant";
import { CreateUserDto } from "apps/user/src/dto/create-user.dto";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { IJwtPayload, IJwtToken } from "@app/token/interface/token.interface";
import { IGatewayResponse } from "../../common/interface/gateway.interface";

@ApiTags('Auth Gateway')
@Controller({
    path: '/auth',
    version: '1'
})
export class AuthGatewayController {
    constructor(
        @Inject(RabbitServiceName.AUTH) private authClient: ClientProxy,
        @Inject(RabbitServiceName.USER) private userClient: ClientProxy
    ) { }

    @Post('/start')
    @ApiCreatedResponse({
        description: 'The Auth Request Created'
    })
    @ApiConflictResponse({
        description: 'The Auth Request Already Exist'
    })
    async startAuthentication(
        @Body() startDto: StartAuthDto,
        @I18n() i18n: I18nContext
    ): Promise<IGatewayResponse> {
        const { state, message } = await firstValueFrom(
            this.authClient.send<IServiceResponse<AuthRequestEntity>>(AUTH_MESSAGE_PATTERNS.START, startDto)
        );
        if (state) {
            return {
                state,
                data: null,
                message: i18n.t(message)
            }
        } else {
            throw new ConflictException(message);
        }
    }

    @Post('/validate')
    async validateAuthentication(
        @Body() validateDto: ValidateAuthDto,
        @I18n() i18n: I18nContext
    ): Promise<IGatewayResponse<IJwtToken>> {
        const { state, data, message } = await firstValueFrom(
            this.authClient.send<IServiceResponse<AuthRequestEntity>>(AUTH_MESSAGE_PATTERNS.VALIDATE, validateDto)
        );
        if (state && data) {
            const { phone } = data;
            let { data: user } = await firstValueFrom(
                this.userClient.send<IServiceResponse<UserEntity>, string>(USER_MESSAGE_PATTERNS.FIND_BY_PHONE, phone)
            );

            if (!user) {
                user = (await firstValueFrom(
                    this.userClient.send<IServiceResponse<UserEntity>, CreateUserDto>(USER_MESSAGE_PATTERNS.CREATE, { phone })
                )).data;
            }

            const { state, data: jwtToken, message } = await firstValueFrom(
                this.authClient.send<IServiceResponse<IJwtToken>, IJwtPayload>(AUTH_MESSAGE_PATTERNS.CREATE_TOKEN, { id: user.id, phone: user.phone })
            );

            return {
                state: state,
                data: jwtToken,
                message: i18n.t(message)
            };
        } else {
            throw new ConflictException(message);
        }
    }
}