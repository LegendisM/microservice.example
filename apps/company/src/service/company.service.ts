import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entity/company.entity';
import { Database } from '@app/database';
import { Like, Repository } from 'typeorm';
import { IServiceResponse } from '@app/rabbit';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { FindCompaniesDto } from '../dto/company/find-company.dto';
import { IPagination } from '@app/common';
import { COMPANY_MAX_COUNT_PER_USER } from '../constant/company.constant';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity, Database.PRIMARY) private companyRepository: Repository<CompanyEntity>
  ) { }

  async create(createDto: CreateCompanyDto, user: UserEntity): Promise<IServiceResponse<CompanyEntity>> {
    let result;
    const { state: canCreate } = await this.validateCompanyCountLimitation(user.id);
    if (canCreate) {
      const company = this.companyRepository.create(createDto);
      company.owner = user;
      result = await this.companyRepository.save(company);
    }
    return {
      state: !!result,
      data: result
    }
  }

  async findAll({ limit, page, name, description, enabled }: FindCompaniesDto): Promise<IServiceResponse<IPagination<CompanyEntity>>> {
    const where = [
      (name) ? { name: Like(name) } : null,
      (description) ? { description: Like(description) } : null,
      (enabled) ? { enabled } : null,
    ];
    const companies = await this.companyRepository.find({
      where: where,
      skip: (page - 1) * limit,
      take: limit
    });
    const companyCount = await this.companyRepository.count({ where });
    return {
      state: true,
      data: {
        limit: limit,
        page: page,
        items: companies,
        total: Math.ceil(companyCount / limit)
      }
    };
  }

  async findById(id: string): Promise<IServiceResponse<CompanyEntity>> {
    const company = await this.companyRepository.findOneBy({ id });
    return {
      state: !!company,
      data: company
    };
  }

  async update(id: string, updateDto: Partial<CompanyEntity>): Promise<IServiceResponse<CompanyEntity>> {
    let result;
    const { state: finded, data: company } = await this.findById(id);
    if (finded) {
      Object.assign(company, updateDto);
      result = await this.companyRepository.save(company);
    }
    return {
      state: !!result,
      data: result
    };
  }

  async validateCompanyCountLimitation(userId: string): Promise<IServiceResponse<boolean>> {
    const ownedCompanies = await this.companyRepository.findBy({ ownerId: userId });
    const valid = (ownedCompanies.length < COMPANY_MAX_COUNT_PER_USER);
    return {
      state: valid,
      data: valid
    };
  }
}
