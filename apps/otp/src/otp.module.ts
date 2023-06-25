import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './service/otp.service';
import { OtpSmsDriverService } from './service/driver/otp-sms-driver.service';
import { OtpEmailDriverService } from './service/driver/otp-email-driver.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [OtpController],
  providers: [
    OtpService,
    OtpSmsDriverService,
    OtpEmailDriverService
  ],
})
export class OtpModule { }
