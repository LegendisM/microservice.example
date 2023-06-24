import { ApiProperty, PickType } from "@nestjs/swagger";
import { BaseUserDto } from "apps/user/src/dto/base-user.dto";
import { IsString, Length } from "class-validator";

export class ValidateAuthDto extends PickType(
    BaseUserDto,
    ['phone']
) {
    @ApiProperty({
        minLength: 4,
        maxLength: 4
    })
    @IsString()
    @Length(4, 4)
    code: string;
}