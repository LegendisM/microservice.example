import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './service/otp.service';
import { OtpSmsDriverService } from './service/driver/otp-sms-driver.service';
import { OtpEmailDriverService } from './service/driver/otp-email-driver.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: './.env'
    }),
    RabbitModule.forServerProxy(RabbitServiceName.OTP)
  ],
  controllers: [OtpController],
  providers: [
    OtpService,
    OtpSmsDriverService,
    OtpEmailDriverService
  ],
})
export class OtpModule { }
