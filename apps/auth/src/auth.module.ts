import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { AuthRequestService } from './service/auth-request.service';
import { Database, DatabaseModule } from '@app/database';
import { AuthRequestEntity } from './entity/auth-request.entity';
import { LanguageModule } from '@app/language';

@Module({
  imports: [
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [AuthRequestEntity]),
    RabbitModule.forServerProxy(RabbitServiceName.AUTH),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRequestService
  ],
})
export class AuthModule { }
