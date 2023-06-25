import _ from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { IServiceResponse, RabbitServiceName } from '@app/rabbit';
import { ClientProxy } from '@nestjs/microservices';
import { USER_MESSAGE_PATTERNS } from 'apps/user/src/constant/user-patterns.constant';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { firstValueFrom } from 'rxjs';
import { IPagination, PaginationDto } from '@app/common';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity) private vehicleRepository: Repository<VehicleEntity>,
    @Inject(RabbitServiceName.VEHICLE) private userClient: ClientProxy
  ) { }

  async create(createDto: CreateVehicleDto): Promise<IServiceResponse<VehicleEntity>> {
    const schema = await this.vehicleRepository.create(_.omit(createDto, ['user']));
    schema.user = await firstValueFrom(
      this.userClient.send<UserEntity>(USER_MESSAGE_PATTERNS.FIND_BY_ID, createDto.user)
    );
    const vehicle = await this.vehicleRepository.save(schema);
    return {
      state: !!vehicle,
      data: vehicle
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
