import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { Body, ConflictException, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { StartAuthDto } from "apps/auth/src/dto/start-auth.dto";
import { firstValueFrom } from "rxjs";
import { AuthRequestEntity } from "apps/auth/src/entity/auth-request.entity";
import { AUTH_MESSAGE_PATTERNS } from "apps/auth/src/constant/auth-patterns.constant";
import { I18n, I18nContext } from "nestjs-i18n";

@ApiTags('Auth Gateway')
@Controller({
    path: '/auth'
})
export class AuthGatewayController {
    constructor(
        @Inject(RabbitServiceName.AUTH) private authClient: ClientProxy
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
    ) {
        const { state, message }: IServiceResponse<AuthRequestEntity> = await firstValueFrom(
            this.authClient.send(AUTH_MESSAGE_PATTERNS.AUTH_START, startDto)
        );
        if (state) {
            return {
                state,
                message: i18n.t(message)
            }
        } else {
            throw new ConflictException(message);
        }
    }
}