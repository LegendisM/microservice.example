import { Controller, Get } from '@nestjs/common';
import { OtpService } from './service/otp.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OTP_MESSAGE_PATTERNS } from './constant/otp-patterns.constant';
import { IServiceResponse } from '@app/rabbit';
import { IOtpRequest } from './interface/otp.interface';

@Controller()
export class OtpController {
  constructor(
    private otpService: OtpService
  ) { }

  @MessagePattern(OTP_MESSAGE_PATTERNS.SEND)
  async sendOtp(@Payload() request: IOtpRequest): Promise<IServiceResponse<boolean>> {
    return this.otpService.send(request);
  }
}
