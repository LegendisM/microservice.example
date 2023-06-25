import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThanOrEqual } from "typeorm";
import { AuthRequestEntity } from "../entity/auth-request.entity";
import { Database } from "@app/database";

@Injectable()
export class AuthRequestService {
    constructor(
        @InjectRepository(AuthRequestEntity, Database.PRIMARY) private authRequestRepository: Repository<AuthRequestEntity>
    ) { }

    async create(phone: string): Promise<AuthRequestEntity> {
        const authRequest = await this.authRequestRepository.create({ phone });
        return await this.authRequestRepository.save(authRequest);
    }

    async findById(id: string): Promise<AuthRequestEntity> {
        return await this.authRequestRepository.findOneBy({ id });
    }

    async findByPhone(phone: string): Promise<AuthRequestEntity> {
        return await this.authRequestRepository.findOneBy({
            phone,
            expire: LessThanOrEqual(new Date())
        });
    }

    async update(id: string, updateDto: Partial<AuthRequestEntity>): Promise<AuthRequestEntity> {
        const authRequest = await this.findById(id);
        Object.assign(authRequest, updateDto);
        return await this.authRequestRepository.save(authRequest);
    }
}