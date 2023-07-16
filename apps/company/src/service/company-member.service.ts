import { Injectable } from "@nestjs/common";
import { CompanyEntity } from "../entity/company.entity";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyMemberEntity } from "../entity/company-member.entity";
import { Database } from "@app/database";
import { Repository } from "typeorm";
import { IServiceResponse } from "@app/rabbit";

@Injectable()
export class CompanyMemberService {
    constructor(
        @InjectRepository(CompanyMemberEntity, Database.PRIMARY) private companyMemberRepository: Repository<CompanyMemberEntity>
    ) { }

    async create(company: CompanyEntity, user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> {
        let result;
        const { state: isUnemployed } = await this.isUnemployed(user);
        if (isUnemployed) {
            const member = await this.companyMemberRepository.create({ company, user });
            result = await this.companyMemberRepository.save(member);
        }
        return {
            state: !!result,
            data: result
        };
    }

    async findAll(company: CompanyEntity): Promise<IServiceResponse<CompanyMemberEntity[]>> {
        const members = await this.companyMemberRepository.findBy({ company: { id: company.id } });
        return {
            state: true,
            data: members
        }
    }

    async findByUser(user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> {
        const member = await this.companyMemberRepository.findOneBy({ user: { id: user.id } });
        return {
            state: !!member,
            data: member
        };
    }

    async remove(user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> {
        let result;
        const { data: member } = await this.findByUser(user);
        if (member) {
            result = await this.companyMemberRepository.remove(member);
        }
        return {
            state: !!result,
            data: result
        };
    }

    async isUnemployed(user: UserEntity): Promise<IServiceResponse<boolean>> {
        const member = await this.companyMemberRepository.findOneBy({ user: { id: user.id } });
        const result = !!member == false;
        return {
            state: result,
            data: result
        };
    }
}