import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { IJwtPayload } from "@app/token";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { USER_MESSAGE_PATTERNS } from "apps/user/src/constant/user-patterns.constant";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { ExtractJwt, Strategy } from "passport-jwt";
import { firstValueFrom } from "rxjs";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        @Inject(RabbitServiceName.USER) private userClient: ClientProxy
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: IJwtPayload): Promise<UserEntity> {
        const { state, data: user } = await firstValueFrom(
            this.userClient.send<IServiceResponse<UserEntity>>(USER_MESSAGE_PATTERNS.FIND_BY_ID, payload.id)
        )
        if (!state) {
            throw new UnauthorizedException();
        }
        return user;
    }
}