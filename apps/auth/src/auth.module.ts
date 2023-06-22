import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';

@Module({
  imports: [
    RabbitModule.forServerProxy(RabbitServiceName.AUTH),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
