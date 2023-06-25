import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_MESSAGE_PATTERNS } from './constant/user-patterns.constant';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IServiceResponse } from '@app/rabbit';

@Controller()
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @MessagePattern(USER_MESSAGE_PATTERNS.USER_CREATE)
  async createUser(@Payload() createDto: CreateUserDto): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.create(createDto);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.USER_FIND_BY_ID)
  async getUserById(@Payload() id: string): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.findById(id);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.USER_FIND_BY_PHONE)
  async getUserByPhone(@Payload() phone: string): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.findByPhone(phone);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.USER_UPDATE)
  async updateUser(@Payload() updateDto: UpdateUserDto): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.update(updateDto.id, updateDto);
  }
}
