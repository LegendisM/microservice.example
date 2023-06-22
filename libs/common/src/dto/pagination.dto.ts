import { Transform } from "class-transformer";
import { IsNumber, Min, Max } from "class-validator";

export class PaginationDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    @Max(50)
    limit: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    page: number;
}