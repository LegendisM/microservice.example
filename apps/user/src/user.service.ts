import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import _ from 'lodash';
import { IServiceResponse } from '@app/rabbit';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
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
      Object.assign(user, _.omit(updateDto, 'id'));
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
