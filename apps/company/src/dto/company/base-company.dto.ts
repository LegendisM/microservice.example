import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

export class BaseCompanyDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 2,
        maxLength: 30
    })
    @IsString()
    @Length(2, 30)
    name: string;

    @ApiProperty({
        minLength: 0,
        maxLength: 255
    })
    @IsString()
    @Length(0, 255)
    description: string;
}