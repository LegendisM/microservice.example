import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import _ from 'lodash';
import { IServiceResponse } from '@app/rabbit';
import { IPagination, PaginationDto } from '@app/common';
import { Database } from '@app/database';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, Database.PRIMARY) private userRepository: Repository<UserEntity>
  ) { }

  async create(createDto: CreateUserDto): Promise<IServiceResponse<UserEntity>> {
    const user = this.userRepository.create(createDto);
    const result = await this.userRepository.save(user);
    return {
      state: !!result,
      data: result,
      message: 'user.created'
    };
  }

  async findAll({ limit, page }: PaginationDto): Promise<IServiceResponse<IPagination<UserEntity>>> {
    const users = await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit - 1
    });
    const usersCount = await this.userRepository.count();
    return {
      state: true,
      data: {
        items: users,
        limit: limit,
        page: page,
        total: usersCount
      }
    }
  }

  async findById(id: string): Promise<IServiceResponse<UserEntity>> {
    const user = await this.userRepository.findOneBy({ id });
    return {
      state: !!user,
      data: user,
      message: !!user ? 'user.finded' : 'user.notfound'
    }
  }

  async findByPhone(phone: string): Promise<IServiceResponse<UserEntity>> {
    const user = await this.userRepository.findOneBy({ phone });
    return {
      state: !!user,
      data: user,
      message: !!user ? 'user.finded' : 'user.notfound'
    }
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<IServiceResponse<UserEntity>> {
    const { state, data: user } = await this.findById(id);
    if (state) {
      Object.assign(user, updateDto);
      const updatedUser = await this.userRepository.save(user);
      return {
        state: !!updatedUser,
        data: updatedUser,
        message: 'user.updated'
      }
    } else {
      return {
        state: false,
        data: null,
        message: 'user.update-fail'
      }
    }
  }
}
