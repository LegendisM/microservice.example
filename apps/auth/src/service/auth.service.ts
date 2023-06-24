import { IServiceResponse, RabbitServiceName } from '@app/rabbit';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { StartAuthDto } from '../dto/start-auth.dto';
import { ValidateAuthDto } from '../dto/validate-auth.dto';
import { AuthRequestService } from './auth-request.service';
import { AuthRequestEntity } from '../entity/auth-request.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RabbitServiceName.USER) private userClient: ClientProxy,
    private authRequestService: AuthRequestService
  ) { }

  async start({ phone }: StartAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    const existRequest = await this.authRequestService.findByPhone(phone);
    if (existRequest) {
      return {
        state: false,
        data: existRequest,
        message: 'auth.request-exist',
      }
    } else {
      const authRequest = await this.authRequestService.create(phone);
      // TODO: send code to client with otp-service
      return {
        state: true,
        data: authRequest,
        message: 'auth.request-created'
      }
    }
  }

  async validate({ phone, code }: ValidateAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    const authRequest = await this.authRequestService.findByPhone(phone);
    if (authRequest && authRequest.code == code) {
      return {
        state: true,
        data: authRequest,
        message: 'auth.request-accepted'
      };
    } else {
      return {
        state: false,
        data: null,
        message: 'auth.request-invalid'
      }
    }
  }
}
