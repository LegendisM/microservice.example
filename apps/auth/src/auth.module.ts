import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { AuthRequestService } from './service/auth-request.service';
import { Database, DatabaseModule } from '@app/database';
import { AuthRequestEntity } from './entity/auth-request.entity';
import { AuthTokenService } from './service/auth-token.service';
import { TokenModule } from '@app/token';

@Module({
  imports: [
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [AuthRequestEntity]),
    RabbitModule.forServerProxy(RabbitServiceName.AUTH),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
    RabbitModule.forClientProxy(RabbitServiceName.OTP),
    TokenModule.register(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRequestService,
    AuthTokenService
  ],
})
export class AuthModule { }
