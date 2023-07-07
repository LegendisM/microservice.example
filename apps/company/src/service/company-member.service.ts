import { Injectable } from "@nestjs/common";
import { CompanyEntity } from "../entity/company.entity";
import { UserEntity } from "apps/user/src/entity/user.entity";

// TODO: create companyMember Entity Before

@Injectable()
export class CompanyMemberService {
    constructor() { }

    async create(company: CompanyEntity, user: UserEntity) { }

    async findAll(company: CompanyEntity) { }

    async remove(user: UserEntity) { }

    async validateMemberIsUnemployed() { }
}