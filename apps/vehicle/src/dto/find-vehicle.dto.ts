import { PaginationDto } from "@app/common";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class FindVehiclesDto extends IntersectionType(PaginationDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    model?: string;

    @ApiProperty()
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    @IsOptional()
    isHeavy?: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    plate?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    vin?: string;

    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    distance?: number;

    @ApiProperty()
    @IsDateString()
    @Transform(({ value }) => Date.parse(value))
    @IsOptional()
    year?: Date;
}