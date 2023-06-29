import { PaginationDto } from "@app/common";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class FindVehiclesDto extends IntersectionType(PaginationDto) {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    model?: string;

    @ApiProperty({ required: false })
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    @IsOptional()
    isHeavy?: boolean;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    plate?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    vin?: string;

    @ApiProperty({ required: false })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    distance?: number;

    @ApiProperty({ required: false })
    @IsDateString()
    @Transform(({ value }) => Date.parse(value))
    @IsOptional()
    year?: Date;
}