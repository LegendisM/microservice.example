import { PaginationDto } from "@app/common";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FindCompaniesDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        description: 'Find By #',
        required: false
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        description: 'Find By #',
        required: false
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Find By #',
        required: false
    })
    @IsBoolean()
    @IsOptional()
    enabled: boolean;
}