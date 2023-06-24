import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "apps/user/src/dto/base-user.dto";

export class StartAuthDto extends PickType(
    BaseUserDto,
    ['phone']
) { }