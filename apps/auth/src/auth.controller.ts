import { Controller, Get } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_MESSAGE_PATTERNS } from './constant/auth-patterns.constant';
import { StartAuthDto } from './dto/start-auth.dto';
import { ValidateAuthDto } from './dto/validate-auth.dto';
import { IServiceResponse } from '@app/rabbit';
import { AuthRequestEntity } from './entity/auth-request.entity';
import { IJwtPayload, IJwtToken } from './interface/token.interface';
import { AuthTokenService } from './service/auth-token.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private authTokenService: AuthTokenService
  ) { }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.START)
  async startAuthentication(@Payload() startDto: StartAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    return await this.authService.start(startDto);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.VALIDATE)
  async validateAuthentication(@Payload() validateDto: ValidateAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    return await this.authService.validate(validateDto);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.CREATE_TOKEN)
  async createToken(@Payload() payload: IJwtPayload): Promise<IServiceResponse<IJwtToken>> {
    return await this.authTokenService.create(payload);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.VALIDATE_TOKEN)
  async validateToken(@Payload() token: IJwtToken): Promise<IServiceResponse<boolean>> {
    return await this.authTokenService.validate(token);
  }
}
