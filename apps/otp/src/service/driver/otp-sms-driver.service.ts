import { Injectable } from "@nestjs/common";
import { OtpDriver } from "../../class/otp-driver.class";
import { IOtpRequest, OtpDriverType } from "../../interface/otp.interface";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OtpSmsDriverService extends OtpDriver {
    type: OtpDriverType = OtpDriverType.SMS;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {
        super();
    }

    async send(request: IOtpRequest): Promise<boolean> {
        let status;
        await firstValueFrom(
            this.httpService.get(
                this.configService.get<string>('KAVENEGAR_OTP_ENDPOINT'),
                {
                    params: {
                        receptor: request.target,
                        token: request.content,
                        template: request.template
                    }
                }
            )
        ).then((response) => {
            status = response.status == 200;
        }).catch(() => {
            status = false;
        });
        return status;
    }
}
