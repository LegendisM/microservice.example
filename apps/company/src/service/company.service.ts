import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entity/company.entity';
import { Database } from '@app/database';
import { Like, Repository } from 'typeorm';
import { IServiceResponse } from '@app/rabbit';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UserEntity } from 'apps/user/src/entity/user.entity';
import { FindCompaniesDto } from '../dto/find-company.dto';
import { IPagination } from '@app/common';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity, Database.PRIMARY) private companyRepository: Repository<CompanyEntity>
  ) { }

  async create(createDto: CreateCompanyDto, user: UserEntity): Promise<IServiceResponse<CompanyEntity>> {
    const company = await this.companyRepository.create(createDto);
    company.owner = user;
    const result = await this.companyRepository.save(company);
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
}
