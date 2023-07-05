import { PickType } from "@nestjs/swagger";
import { BaseCompanyDto } from "./base-company.dto";

export class CreateCompanyDto extends PickType(
    BaseCompanyDto,
    ['name', 'description']
) { }