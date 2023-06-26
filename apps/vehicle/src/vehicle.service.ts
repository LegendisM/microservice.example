import _ from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { IServiceResponse, RabbitServiceName } from '@app/rabbit';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { IPagination, PaginationDto } from '@app/common';
import { Database } from '@app/database';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity, Database.PRIMARY) private vehicleRepository: Repository<VehicleEntity>,
    @Inject(RabbitServiceName.USER) private userClient: ClientProxy
  ) { }

  async create(createDto: CreateVehicleDto, user: UserEntity): Promise<IServiceResponse<VehicleEntity>> {
    const vehicle = await this.vehicleRepository.create(createDto);
    vehicle.user = user;
    const result = await this.vehicleRepository.save(vehicle);
    return {
      state: !!result,
      data: result
    };
  }

  async findAll({ limit, page }: PaginationDto): Promise<IServiceResponse<IPagination<VehicleEntity>>> {
    const vehicles = await this.vehicleRepository.find({
      skip: (page - 1) * limit,
      take: limit - 1
    });
    const vehiclesCount = await this.vehicleRepository.count();
    return {
      state: true,
      data: {
        items: vehicles,
        limit: limit,
        page: page,
        total: vehiclesCount
      }
    }
  }

  async findAllByUser(userId: string): Promise<IServiceResponse<VehicleEntity[]>> {
    const vehicles = await this.vehicleRepository.findBy({ user: { id: userId } });
    return {
      state: true,
      data: vehicles
    };
  }

  async findById(id: string): Promise<IServiceResponse<VehicleEntity>> {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    return {
      state: true,
      data: vehicle
    }
  }

  async findByPlate(plate: string): Promise<IServiceResponse<VehicleEntity>> {
    const vehicle = await this.vehicleRepository.findOneBy({ plate });
    return {
      state: true,
      data: vehicle
    }
  }
}
