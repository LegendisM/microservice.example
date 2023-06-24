import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsPhoneNumber, IsString, IsUUID, Length } from "class-validator";
import { Role } from "../interface/role.interface";

export class BaseUserDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsPhoneNumber('IR')
    phone: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 30
    })
    @IsString()
    @Length(1, 30)
    username: string;

    @ApiProperty({
        minLength: 4,
        maxLength: 30
    })
    @IsString()
    @Length(4, 30)
    password: string;

    @ApiProperty({
        enum: Role,
        isArray: true
    })
    @IsArray()
    roles: Role[];
}