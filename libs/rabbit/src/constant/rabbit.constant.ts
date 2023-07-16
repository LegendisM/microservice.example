import { RabbitServiceName } from "../interface/rabbit.interface";

export const RABBIT_SERVICE_OPTIONS = "RABBIT_SERVICE_OPTIONS";

export const RABBIT_SERVICES: Record<RabbitServiceName, { queue: string }> = {
    USER_SERVICE: {
        queue: 'user_queue'
    },
    AUTH_SERVICE: {
        queue: 'auth_queue'
    },
    VEHICLE_SERVICE: {
        queue: 'vehicle_queue'
    },
    OTP_SERVICE: {
        queue: 'otp_queue'
    },
    STORAGE_SERVICE: {
        queue: 'storage_queue'
    },
    COMPANY_SERVICE: {
        queue: 'company_service'
    }
}