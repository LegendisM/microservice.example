import { Module } from "@nestjs/common";
import { AuthGatewayController } from "./auth-gateway.controller";

@Module({
    controllers: [AuthGatewayController]
})
export class AuthGatewayModule { }