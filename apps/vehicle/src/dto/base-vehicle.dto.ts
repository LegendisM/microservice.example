import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString, IsUUID, Length, MaxLength, Min } from "class-validator";

export class BaseVehicleDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    model: string;

    @ApiProperty()
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    isHeavy: boolean;

    @ApiProperty({
        minLength: 4,
        maxLength: 10
    })
    @IsString()
    @Length(4, 10)
    plate: string;

    @ApiProperty({
        minLength: 2,
        maxLength: 10
    })
    @IsString()
    @Length(2, 10)
    color: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 17
    })
    @IsString()
    @Length(1, 17)
    vin: string;

    @ApiProperty({
        minimum: 0
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    distance: number;

    @ApiProperty()
    @Transform(({ value }) => new Date(Date.parse(value)))
    @IsDate()
    year: Date;
}