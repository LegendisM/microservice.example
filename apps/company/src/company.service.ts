import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entity/company.entity';
import { Database } from '@app/database';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity, Database.PRIMARY) private companyRepository: Repository<CompanyEntity>
  ) { }

  async create() { }

  async findAll() { }

  async findById() { }
}
