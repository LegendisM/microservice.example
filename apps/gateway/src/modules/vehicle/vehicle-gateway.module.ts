import { Module } from "@nestjs/common";
import { VehicleGatewayController } from "./vehicle-gateway.controller";

@Module({
    controllers:[VehicleGatewayController]
})
export class VehicleGatewayModule { }