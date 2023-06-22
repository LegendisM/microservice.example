import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';

@Module({
  imports: [
    RabbitModule.forServerProxy(RabbitServiceName.PROFILE),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
