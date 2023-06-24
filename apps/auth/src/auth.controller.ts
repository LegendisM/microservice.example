import { Controller, Get } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_MESSAGE_PATTERNS } from './constant/auth-patterns.constant';
import { StartAuthDto } from './dto/start-auth.dto';
import { ValidateAuthDto } from './dto/validate-auth.dto';
import { IServiceResponse } from '@app/rabbit';
import { AuthRequestEntity } from './entity/auth-request.entity';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.AUTH_START)
  async startAuthentication(@Payload() startDto: StartAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    return await this.authService.start(startDto);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.AUTH_VALIDATE)
  async validateAuthentication(@Payload() validateDto: ValidateAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    return await this.authService.validate(validateDto);
  }
}
