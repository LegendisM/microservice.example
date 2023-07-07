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

@Module({
  imports: [
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [CompanyEntity, CompanyCategoryEntity, CompanyInvitationEntity]),
    RabbitModule.forServerProxy(RabbitServiceName.COMPANY),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyInvitationService, CompanyMemberService],
})
export class CompanyModule { }
