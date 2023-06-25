import { LanguageModule } from '@app/language';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGatewayModule } from './modules/auth/auth-gateway.module';
import { AuthenticationModule } from '@app/authentication';
import { VehicleGatewayModule } from './modules/vehicle/vehicle-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env'
    }),
    LanguageModule.register(),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
    RabbitModule.forClientProxy(RabbitServiceName.AUTH),
    RabbitModule.forClientProxy(RabbitServiceName.PROFILE),
    RabbitModule.forClientProxy(RabbitServiceName.VEHICLE),
    RabbitModule.forClientProxy(RabbitServiceName.REPORT),
    AuthenticationModule.register(),
    AuthGatewayModule,
    VehicleGatewayModule
  ],
})
export class GatewayModule { }
