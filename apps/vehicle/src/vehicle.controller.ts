import { Controller, Get } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VEHICLE_MESSAGE_PATTERNS } from './constant/vehicle-patterns.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { IServiceResponse } from '@app/rabbit';
import { VehicleEntity } from './entity/vehicle.entity';
import { IPagination, PaginationDto } from '@app/common';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { FindVehiclesDto } from './dto/find-vehicle.dto';

@Controller()
export class VehicleController {
  constructor(
    private vehicleService: VehicleService
  ) { }

  @MessagePattern(VEHICLE_MESSAGE_PATTERNS.CREATE)
  async createVehicle(
    @Payload('createDto') createDto: CreateVehicleDto,
    @Payload('user') user: UserEntity,
  ): Promise<IServiceResponse<VehicleEntity>> {
    return await this.vehicleService.create(createDto, user);
  }

  @MessagePattern(VEHICLE_MESSAGE_PATTERNS.FIND_ALL)
  async getVehicles(@Payload() findDto: FindVehiclesDto): Promise<IServiceResponse<IPagination<VehicleEntity>>> {
    return await this.vehicleService.findAll(findDto);
  }

  @MessagePattern(VEHICLE_MESSAGE_PATTERNS.FIND_ALL_BY_USER)
  async getUserVehicles(@Payload() userId: string): Promise<IServiceResponse<VehicleEntity[]>> {
    return await this.vehicleService.findAllByUser(userId);
  }

  @MessagePattern(VEHICLE_MESSAGE_PATTERNS.FIND_BY_ID)
  async getVehicleById(@Payload() id: string): Promise<IServiceResponse<VehicleEntity>> {
    return await this.vehicleService.findById(id);
  }
}
