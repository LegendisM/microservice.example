import { PickType } from "@nestjs/swagger";
import { BaseVehicleDto } from "./base-vehicle.dto";

export class CreateVehicleDto extends PickType(
    BaseVehicleDto,
    ['model', 'isHeavy', 'plate', 'color', 'vin', 'distance', 'year']
) { }