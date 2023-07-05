import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyInvitationEntity } from "../entity/company-invitation.entity";
import { Database } from "@app/database";
import { Repository } from "typeorm";
import { CreateCompanyInvitationDto } from "../dto/invitation/create-company-invitation.dto";
import { UserEntity } from "apps/user/src/entity/user.entity";
import { CompanyEntity } from "../entity/company.entity";

@Injectable()
export class CompanyInvitationService {
    constructor(
        @InjectRepository(CompanyInvitationEntity, Database.PRIMARY) private companyInvitationRepository: Repository<CompanyInvitationEntity>
    ) { }

    async create(createDto: CreateCompanyInvitationDto) { }

    async findById(id: string) { }

    async findByCode(code: string) { }

    async use(code: string, user: UserEntity) { }

    async remove(id: string) { }

    async validateMaxInviteCount(company: CompanyEntity) { }
}