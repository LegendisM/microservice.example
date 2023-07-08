import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { COMPANY_MESSAGE_PATTERNS } from '../constant/company-patterns.constant';
import { IServiceResponse } from '@app/rabbit';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { CompanyEntity } from '../entity/company.entity';
import { CompanyService } from '../service/company.service';
import { FindCompaniesDto } from '../dto/company/find-company.dto';
import { IPagination } from '@app/common/interface/pagination.interface';

@Controller()
export class CompanyController {
  constructor(
    private companyService: CompanyService
  ) { }

  @MessagePattern(COMPANY_MESSAGE_PATTERNS.CREATE)
  async createCompany(
    @Payload('createDto') createDto: CreateCompanyDto,
    @Payload('user') user: UserEntity
  ): Promise<IServiceResponse<CompanyEntity>> {
    return await this.companyService.create(createDto, user);
  }

  @MessagePattern(COMPANY_MESSAGE_PATTERNS.FIND_ALL)
  async getCompanies(@Payload() findDto: FindCompaniesDto): Promise<IServiceResponse<IPagination<CompanyEntity>>> {
    return await this.companyService.findAll(findDto);
  }

  @MessagePattern(COMPANY_MESSAGE_PATTERNS.FIND_BY_ID)
  async getCompanyById(@Payload() id: string): Promise<IServiceResponse<CompanyEntity>> {
    return await this.companyService.findById(id);
  }
}
