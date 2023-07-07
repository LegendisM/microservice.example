import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyInvitationEntity } from "../entity/company-invitation.entity";
import { Database } from "@app/database";
import { MoreThanOrEqual, Repository } from "typeorm";
import { CreateCompanyInvitationDto } from "../dto/invitation/create-company-invitation.dto";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { CompanyEntity } from "../entity/company.entity";
import { IServiceResponse } from "@app/rabbit";
import { COMPANY_MAX_INVITATION_COUNT } from "../constant/company.constant";
import { CompanyMemberService } from "./company-member.service";

@Injectable()
export class CompanyInvitationService {
    constructor(
        @InjectRepository(CompanyInvitationEntity, Database.PRIMARY) private companyInvitationRepository: Repository<CompanyInvitationEntity>,
        private companyMemberService: CompanyMemberService
    ) { }

    async create({ company }: CreateCompanyInvitationDto): Promise<IServiceResponse<CompanyInvitationEntity>> {
        let result;
        const { state: canCreate } = await this.validateMaxInviteCount(company);
        if (canCreate) {
            const invite = this.companyInvitationRepository.create();
            invite.company = company;
            result = await this.companyInvitationRepository.save(invite);
        }
        return {
            state: !!result,
            data: result
        };
    }

    async findById(id: string): Promise<IServiceResponse<CompanyInvitationEntity>> {
        const invite = await this.companyInvitationRepository.findOneBy({ id });
        return {
            state: !!invite,
            data: invite
        }
    }

    async findByActiveCode(code: string): Promise<IServiceResponse<CompanyInvitationEntity>> {
        const invite = await this.companyInvitationRepository.findOneBy({
            code,
            use: false,
            expire: MoreThanOrEqual(new Date())
        });
        return {
            state: !!invite,
            data: invite
        }
    }

    async use(code: string, user: UserEntity): Promise<IServiceResponse<boolean>> {
        let result;
        const { state: finded, data: { id } = { id: null } } = await this.findByActiveCode(code);
        if (finded) {
            const { state: updated, data: invite } = await this.update(id, { use: true });
            if (updated) {
                // await this.companyMemberService.create(company, user); // TODO: create company member for this user
                result = invite;
            }
        }
        return {
            state: !!result,
            data: result,
            message: `company.invitation-${!!result ? 'success' : 'invalid'}`
        }
    }

    async update(id: string, updateDto: Partial<CompanyInvitationEntity>): Promise<IServiceResponse<CompanyInvitationEntity>> {
        let result;
        const { state: finded, data: invite } = await this.findById(id);
        if (finded) {
            Object.assign(invite, updateDto);
            result = await this.companyInvitationRepository.save(invite);
        }
        return {
            state: !!result,
            data: result
        }
    }

    async remove(id: string): Promise<IServiceResponse<CompanyInvitationEntity>> {
        let result;
        const { state: finded, data: invite } = await this.findById(id);
        if (finded) {
            result = await this.companyInvitationRepository.remove(invite);
        }
        return {
            state: !!result,
            data: result
        };
    }

    async validateMaxInviteCount(company: CompanyEntity): Promise<IServiceResponse<boolean>> {
        const invites = await this.companyInvitationRepository.findBy({ company: { id: company.id } });
        const valid = (invites.length < COMPANY_MAX_INVITATION_COUNT);
        return {
            state: valid,
            data: valid
        }
    }
}