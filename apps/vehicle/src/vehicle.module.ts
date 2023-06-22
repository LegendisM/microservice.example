import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';

@Module({
  imports: [
    RabbitModule.forServerProxy(RabbitServiceName.VEHICLE),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule { }
