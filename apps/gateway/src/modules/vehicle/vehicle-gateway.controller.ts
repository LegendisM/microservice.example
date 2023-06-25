import { Auth, CurrentUser } from "@app/authentication";
import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { VEHICLE_MESSAGE_PATTERNS } from "apps/vehicle/src/constant/vehicle-patterns.dto";
import { CreateVehicleDto } from "apps/vehicle/src/dto/create-vehicle.dto";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";
import { firstValueFrom } from "rxjs";
import { IGatewayResponse } from "../../common/interface/gateway.interface";
import { UserEntity } from "apps/user/src/entity/user.entity";

@ApiTags('Vehicle Gateway')
@Controller({
    path: '/vehicle',
    version: '1'
})
@Auth()
export class VehicleGatewayController {
    constructor(
        @Inject(RabbitServiceName.VEHICLE) private vehicleClient: ClientProxy
    ) { }

    @Post('/')
    async createVehicle(
        @Body() createDto: CreateVehicleDto,
        @CurrentUser() user: UserEntity
    ): Promise<IGatewayResponse> {
        createDto.userId = user.id;
        const { state, data: vehicle } = await firstValueFrom(
            this.vehicleClient.send<IServiceResponse<VehicleEntity>>(VEHICLE_MESSAGE_PATTERNS.CREATE, createDto)
        )
        return {
            state: state,
            data: vehicle
        }
    }
}