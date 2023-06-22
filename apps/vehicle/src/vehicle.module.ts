import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
