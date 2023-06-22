import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env'
    }),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
    RabbitModule.forClientProxy(RabbitServiceName.AUTH),
    RabbitModule.forClientProxy(RabbitServiceName.PROFILE),
    RabbitModule.forClientProxy(RabbitServiceName.VEHICLE),
    RabbitModule.forClientProxy(RabbitServiceName.REPORT),
  ],
})
export class GatewayModule { }
