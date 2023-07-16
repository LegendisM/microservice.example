import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { COMPANY_MEMBER_MESSAGE_PATTERNS } from "../constant/company-patterns.constant";
import { IServiceResponse } from "@app/rabbit";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { CompanyMemberService } from "../service/company-member.service";
import { CompanyEntity } from "../entity/company.entity";
import { CompanyMemberEntity } from "../entity/company-member.entity";

@Controller()
export class CompanyMemberController {
    constructor(
        private companyMemberService: CompanyMemberService
    ) { }

    @MessagePattern(COMPANY_MEMBER_MESSAGE_PATTERNS.CREATE)
    async createMember(
        @Payload('company') company: CompanyEntity,
        @Payload('user') user: UserEntity
    ): Promise<IServiceResponse<CompanyMemberEntity>> {
        return await this.companyMemberService.create(company, user);
    }

    @MessagePattern(COMPANY_MEMBER_MESSAGE_PATTERNS.FIND_ALL)
    async getMembers(@Payload() company: CompanyEntity): Promise<IServiceResponse<CompanyMemberEntity[]>> {
        return await this.companyMemberService.findAll(company);
    }

    @MessagePattern(COMPANY_MEMBER_MESSAGE_PATTERNS.FIND_BY_USER)
    async getMemberByUser(@Payload() user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> {
        return await this.companyMemberService.findByUser(user);
    }

    @MessagePattern(COMPANY_MEMBER_MESSAGE_PATTERNS.REMOVE)
    async removeMember(@Payload() user: UserEntity): Promise<IServiceResponse<CompanyMemberEntity>> {
        return await this.companyMemberService.remove(user);
    }

    @MessagePattern(COMPANY_MEMBER_MESSAGE_PATTERNS.is_UNEMPLOYED)
    async getUserIsUnemployed(@Payload() user: UserEntity): Promise<IServiceResponse<boolean>> {
        return await this.companyMemberService.isUnemployed(user);
    }
}