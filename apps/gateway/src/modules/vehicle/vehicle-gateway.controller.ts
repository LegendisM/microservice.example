import { Auth, CurrentUser } from "@app/authentication";
import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Query, SerializeOptions } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { VEHICLE_MESSAGE_PATTERNS } from "apps/vehicle/src/constant/vehicle-patterns.dto";
import { CreateVehicleDto } from "apps/vehicle/src/dto/create-vehicle.dto";
import { VehicleEntity } from "apps/vehicle/src/entity/vehicle.entity";
import { firstValueFrom } from "rxjs";
import { IGatewayResponse } from "../../common/interface/gateway.interface";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { IPagination } from "@app/common";
import { FindVehiclesDto } from "apps/vehicle/src/dto/find-vehicle.dto";
import { Roles } from "@app/authentication/decorator/role.decorator";
import { Role } from "apps/user/src/interface/role.interface";
import { PolicyAction, PolicyService } from "@app/policy";

@ApiTags('Vehicle Gateway')
@Controller({
    path: '/vehicles',
    version: '1'
})
@Auth()
export class VehicleGatewayController {
    constructor(
        @Inject(RabbitServiceName.VEHICLE) private vehicleClient: ClientProxy,
        private policyService: PolicyService
    ) { }

    @Get('/')
    @Roles(Role.OWNER, Role.ADMIN)
    async getVehicles(@Query() findDto: FindVehiclesDto): Promise<IGatewayResponse<IPagination<VehicleEntity>>> {
        const { state, data: vehicles } = await firstValueFrom(
            this.vehicleClient.send<IServiceResponse<IPagination<VehicleEntity>>, FindVehiclesDto>(
                VEHICLE_MESSAGE_PATTERNS.FIND_ALL,
                findDto
            )
        );
        return {
            state,
            data: vehicles
        }
    }

    @Get('/me')
    async getUserVehicles(@CurrentUser() user: UserEntity): Promise<IGatewayResponse<VehicleEntity[]>> {
        const { state, data: vehicles } = await firstValueFrom(
            this.vehicleClient.send<IServiceResponse<VehicleEntity[]>, string>(
                VEHICLE_MESSAGE_PATTERNS.FIND_ALL_BY_USER,
                user.id
            )
        );
        return {
            state,
            data: vehicles
        }
    }

    @Get('/:id')
    async getVehicleById(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: UserEntity
    ): Promise<IGatewayResponse<VehicleEntity>> {
        const { state, data: vehicle } = await firstValueFrom(
            this.vehicleClient.send<IServiceResponse<VehicleEntity>, string>(
                VEHICLE_MESSAGE_PATTERNS.FIND_BY_ID,
                id
            )
        );
        this.policyService.forVehicle(PolicyAction.Read, user, vehicle, true);
        return {
            state,
            data: vehicle
        }
    }

    @Post('/')
    @SerializeOptions({ excludePrefixes: ['user'] })
    async createVehicle(
        @Body() createDto: CreateVehicleDto,
        @CurrentUser() user: UserEntity
    ): Promise<IGatewayResponse> {
        const { state, data: vehicle } = await firstValueFrom(
            this.vehicleClient.send<IServiceResponse<VehicleEntity>>(
                VEHICLE_MESSAGE_PATTERNS.CREATE,
                {
                    createDto: createDto,
                    user: user
                }
            )
        );
        return {
            state: state,
            data: vehicle
        }
    }
}