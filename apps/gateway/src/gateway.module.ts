import path from 'path';
import { LanguageModule } from '@app/language';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '@app/authentication';
import { AuthGatewayController } from './modules/auth/auth-gateway.controller';
import { VehicleGatewayController } from './modules/vehicle/vehicle-gateway.controller';
import { PolicyModule } from '@app/policy';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { UserGatewayController } from './modules/user/user-gateway.controller';
import { UserProfileGatewayController } from './modules/user/user-profile-gateway.controller';
import { CompanyGatewayController } from './modules/company/company-gateway.controller';
import { CompanyMemberController } from 'apps/company/src/controller/company-member.controller';
import { CompanyInvitationController } from 'apps/company/src/controller/company-invitation.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env'
    }),
    LanguageModule.register(
      path.join(__dirname, '../../../static/i18n')
    ),
    MulterModule.register({
      storage: multer.memoryStorage()
    }),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
    RabbitModule.forClientProxy(RabbitServiceName.AUTH),
    RabbitModule.forClientProxy(RabbitServiceName.VEHICLE),
    RabbitModule.forClientProxy(RabbitServiceName.STORAGE),
    RabbitModule.forClientProxy(RabbitServiceName.COMPANY),
    AuthenticationModule.register(),
    PolicyModule
  ],
  controllers: [
    AuthGatewayController,
    UserGatewayController,
    UserProfileGatewayController,
    VehicleGatewayController,
    CompanyGatewayController,
    CompanyMemberController,
    CompanyInvitationController
  ]
})
export class GatewayModule { }
