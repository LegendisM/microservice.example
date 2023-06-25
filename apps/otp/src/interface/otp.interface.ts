export enum OtpDriverType {
    SMS = "sms",
    EMAIL = "email"
}

export enum OtpTemplate {
    AUTHENTICATION = "authentication"
}

export interface IOtpRequest {
    type: OtpDriverType;
    target: string;
    template: OtpTemplate;
    content: string;
}