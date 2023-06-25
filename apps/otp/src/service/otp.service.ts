import { Injectable } from '@nestjs/common';
import { IOtpRequest, OtpDriverType } from '../interface/otp.interface';
import { IServiceResponse } from '@app/rabbit';
import { OtpEmailDriverService } from './driver/otp-email-driver.service';
import { OtpSmsDriverService } from './driver/otp-sms-driver.service';
import { OtpDriver } from '../class/otp-driver.class';

@Injectable()
export class OtpService {
    constructor(
        private smsDriverService: OtpSmsDriverService,
        private emailDriverService: OtpEmailDriverService,
    ) { }

    async send(request: IOtpRequest): Promise<IServiceResponse<boolean>> {
        const driver = this.findDriver(request.type);
        const sended = await driver.send(request);
        return {
            state: sended,
            data: sended
        };
    }

    findDriver(type: OtpDriverType): OtpDriver {
        let driver: OtpDriver;

        switch (type) {
            case OtpDriverType.SMS:
                driver = this.smsDriverService;
                break;
            case OtpDriverType.EMAIL:
                driver = this.emailDriverService;
                break;
            default:
                driver = this.smsDriverService;
                break;
        }

        return driver;
    }
}
