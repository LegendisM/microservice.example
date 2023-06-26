import { RabbitModule, RabbitServiceName } from "@app/rabbit";
import { TokenModule } from "@app/token";
import { DynamicModule } from "@nestjs/common";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";

export class AuthenticationModule {
  static register(): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: './.env'
        }),
        TokenModule.register(),
        RabbitModule.forClientProxy(RabbitServiceName.USER)
      ],
      providers: [JwtStrategy],
      exports: [JwtStrategy]
    }
  }
}``