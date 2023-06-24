import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user.dto";

export class CreateUserDto extends PickType(
    BaseUserDto,
    ["phone"]
) { }