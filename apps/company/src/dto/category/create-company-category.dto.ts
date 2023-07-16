import { PickType } from "@nestjs/swagger";
import { BaseCompanyCategoryDto } from "./base-company-category.dto";

export class CreateCompanyCategoryDto extends PickType(
    BaseCompanyCategoryDto,
    ['title']
) { }