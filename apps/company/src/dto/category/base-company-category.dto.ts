import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class BaseCompanyCategoryDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
}