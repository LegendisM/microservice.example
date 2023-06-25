import { IServiceResponse, RabbitServiceName } from '@app/rabbit';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StartAuthDto } from '../dto/start-auth.dto';
import { ValidateAuthDto } from '../dto/validate-auth.dto';
import { AuthRequestService } from './auth-request.service';
import { AuthRequestEntity } from '../entity/auth-request.entity';
import { firstValueFrom } from 'rxjs';
import { IOtpRequest, OtpDriverType, OtpTemplate } from 'apps/otp/src/interface/otp.interface';
import { OTP_MESSAGE_PATTERNS } from 'apps/otp/src/constant/otp-patterns.constant';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RabbitServiceName.OTP) private otpClient: ClientProxy,
    private authRequestService: AuthRequestService,
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
      const otpSended = await firstValueFrom(
        this.otpClient.send<boolean, IOtpRequest>(
          OTP_MESSAGE_PATTERNS.OTP_SEND,
          {
            type: OtpDriverType.SMS,
            target: authRequest.phone,
            template: OtpTemplate.AUTHENTICATION,
            content: authRequest.code
          }
        )
      );

      await this.authRequestService.update(authRequest.id, { send: otpSended });

      return {
        state: true,
        data: authRequest,
        message: 'auth.request-created'
      }
    }
  }

  async validate({ phone, code }: ValidateAuthDto): Promise<IServiceResponse<AuthRequestEntity>> {
    const authRequest = await this.authRequestService.findByPhone(phone);
    if (authRequest && authRequest.code == code && authRequest.use == false) {
      await this.authRequestService.update(authRequest.id, { use: true });
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
