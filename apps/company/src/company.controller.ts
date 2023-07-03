import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { MessagePattern } from '@nestjs/microservices';
import { COMPANY_MESSAGE_PATTERNS } from './constant/company-patterns.constant';

@Controller()
export class CompanyController {
  constructor(
    private companyService: CompanyService
  ) { }

  @MessagePattern(COMPANY_MESSAGE_PATTERNS.CREATE)
  async createCompany() { }

  @MessagePattern(COMPANY_MESSAGE_PATTERNS.FIND_ALL)
  async getCompanies() { }

  @MessagePattern(COMPANY_MESSAGE_PATTERNS.FIND_BY_ID)
  async getCompanyById() { }
}
