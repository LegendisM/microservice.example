import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_MESSAGE_PATTERNS } from './constant/user-patterns.constant';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IServiceResponse } from '@app/rabbit';
import { IPagination, PaginationDto } from '@app/common';

@Controller()
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @MessagePattern(USER_MESSAGE_PATTERNS.CREATE)
  async createUser(@Payload() createDto: CreateUserDto): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.create(createDto);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FINDALL)
  async getUsers(@Payload() paginationDto: PaginationDto): Promise<IServiceResponse<IPagination<UserEntity>>> {
    return await this.userService.findAll(paginationDto);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_BY_ID)
  async getUserById(@Payload() id: string): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.findById(id);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_BY_PHONE)
  async getUserByPhone(@Payload() phone: string): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.findByPhone(phone);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.UPDATE)
  async updateUser(
    @Payload('id') id: string,
    @Payload('updateDto') updateDto: UpdateUserDto
  ): Promise<IServiceResponse<UserEntity>> {
    return await this.userService.update(id, updateDto);
  }
}
