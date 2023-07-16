import { Controller } from "@nestjs/common";
import { CompanyInvitationService } from "../service/company-invitation.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { COMPANY_INVITATION_MESSAGE_PATTERNS } from "../constant/company-patterns.constant";
import { IServiceResponse } from "@app/rabbit";
import { CompanyInvitationEntity } from "../entity/company-invitation.entity";
import { CreateCompanyInvitationDto } from "../dto/invitation/create-company-invitation.dto";
import { UserEntity } from "apps/user/src/entity/user.entity";

@Controller()
export class CompanyInvitationController {
    constructor(
        private companyInvitationService: CompanyInvitationService
    ) { }

    @MessagePattern(COMPANY_INVITATION_MESSAGE_PATTERNS.CREATE)
    async createInvitation(@Payload() createDto: CreateCompanyInvitationDto): Promise<IServiceResponse<CompanyInvitationEntity>> {
        return await this.companyInvitationService.create(createDto);
    }

    @MessagePattern(COMPANY_INVITATION_MESSAGE_PATTERNS.FIND_BY_ID)
    async getInvitationById(@Payload() id: string): Promise<IServiceResponse<CompanyInvitationEntity>> {
        return await this.companyInvitationService.findById(id);
    }

    @MessagePattern(COMPANY_INVITATION_MESSAGE_PATTERNS.FIND_BY_ACTIVE_CODE)
    async getInvitationByCode(@Payload() code: string): Promise<IServiceResponse<CompanyInvitationEntity>> {
        return await this.companyInvitationService.findByActiveCode(code);
    }

    @MessagePattern(COMPANY_INVITATION_MESSAGE_PATTERNS.UPDATE)
    async updateInvitation(
        @Payload('id') id: string,
        @Payload('updateDto') updateDto: Partial<CompanyInvitationEntity>
    ): Promise<IServiceResponse<CompanyInvitationEntity>> {
        return await this.companyInvitationService.update(id, updateDto);
    }

    @MessagePattern(COMPANY_INVITATION_MESSAGE_PATTERNS.REMOVE)
    async removeInvitation(@Payload() id: string): Promise<IServiceResponse<CompanyInvitationEntity>> {
        return await this.companyInvitationService.remove(id);
    }

    @MessagePattern(COMPANY_INVITATION_MESSAGE_PATTERNS.USE)
    async useInvitation(
        @Payload('code') code: string,
        @Payload('user') user: UserEntity
    ): Promise<IServiceResponse<boolean>> {
        return await this.companyInvitationService.use(code, user);
    }
}