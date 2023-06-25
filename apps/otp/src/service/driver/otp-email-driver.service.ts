import { Injectable } from "@nestjs/common";
import { OtpDriver } from "../../class/otp-driver.class";
import { IOtpRequest, OtpDriverType } from "../../interface/otp.interface";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class OtpEmailDriverService extends OtpDriver {
    type: OtpDriverType = OtpDriverType.EMAIL;

    constructor(
        private httpService: HttpService
    ) {
        super();
    }

    send(request: IOtpRequest): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
