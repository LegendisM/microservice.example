import path from 'path';
import { LanguageModule } from '@app/language';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '@app/authentication';
import { AuthGatewayController } from './modules/auth/auth-gateway.controller';
import { VehicleGatewayController } from './modules/vehicle/vehicle-gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env'
    }),
    LanguageModule.register(
      path.join(__dirname, '../../../static/i18n')
    ),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
    RabbitModule.forClientProxy(RabbitServiceName.AUTH),
    // RabbitModule.forClientProxy(RabbitServiceName.PROFILE),
    RabbitModule.forClientProxy(RabbitServiceName.VEHICLE),
    RabbitModule.forClientProxy(RabbitServiceName.REPORT),
    AuthenticationModule.register(),
  ],
  controllers: [
    AuthGatewayController,
    VehicleGatewayController
  ]
})
export class GatewayModule { }
