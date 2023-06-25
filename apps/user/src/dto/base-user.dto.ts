import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmail, IsPhoneNumber, IsString, IsUUID, Length } from "class-validator";
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
        enum: Role,
        isArray: true
    })
    @IsArray()
    roles: Role[];

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({
        minLength: 10,
        maxLength: 10
    })
    @IsString()
    @Length(10, 10)
    nationalcode: string;

    @ApiProperty()
    @IsDate()
    birthday: Date;
}