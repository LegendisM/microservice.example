import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './service/company.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { Database, DatabaseModule } from '@app/database';
import { CompanyEntity } from './entity/company.entity';
import { CompanyCategoryEntity } from './entity/company-category.entity';
import { CompanyInvitationEntity } from './entity/company-invitation.entity';
import { CompanyInvitationService } from './service/company-invitation.service';
import { CompanyMemberService } from './service/company-member.service';
import { CompanyMemberEntity } from './entity/company-member.entity';
import { CompanyInvitationController } from './controller/company-invitation.controller';
import { CompanyMemberController } from './controller/company-member.controller';

@Module({
  imports: [
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [CompanyEntity, CompanyMemberEntity, CompanyCategoryEntity, CompanyInvitationEntity]),
    RabbitModule.forServerProxy(RabbitServiceName.COMPANY),
  ],
  controllers: [CompanyController, CompanyInvitationController, CompanyMemberController],
  providers: [CompanyService, CompanyInvitationService, CompanyMemberService],
})
export class CompanyModule { }
