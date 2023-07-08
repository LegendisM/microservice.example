import { Injectable } from "@nestjs/common";
import { CompanyEntity } from "../entity/company.entity";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyMemberEntity } from "../entity/company-member.entity";
import { Database } from "@app/database";
import { Repository } from "typeorm";
import { IServiceResponse } from "@app/rabbit";
import { IPagination } from "@app/common";

@Injectable()
export class CompanyMemberService {
    constructor(
        @InjectRepository(CompanyMemberEntity, Database.PRIMARY) private companyMemberRepository: Repository<CompanyMemberEntity>
    ) { }

    async create(company: CompanyEntity, user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> { }

    async findAll(company: CompanyEntity): Promise<IServiceResponse<IPagination<CompanyMemberEntity>>> { }

    async remove(user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> { }

    async isUnemployed(user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> { }
}