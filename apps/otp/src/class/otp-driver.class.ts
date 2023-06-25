import { IOtpRequest, OtpDriverType } from "../interface/otp.interface";

export abstract class OtpDriver {
    abstract type: OtpDriverType;
    abstract send(request: IOtpRequest): Promise<boolean>;
}