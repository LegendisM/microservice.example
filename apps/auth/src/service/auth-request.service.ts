import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThanOrEqual } from "typeorm";
import { AuthRequestEntity } from "../entity/auth-request.entity";

@Injectable()
export class AuthRequestService {
    constructor(
        @InjectRepository(AuthRequestEntity) private authRequestRepository: Repository<AuthRequestEntity>,
        private authRequestService: AuthRequestService
    ) { }

    async create(phone: string): Promise<AuthRequestEntity> {
        const authRequest = await this.authRequestRepository.create({ phone });
        return await this.authRequestRepository.save(authRequest);
    }

    async findByPhone(phone: string): Promise<AuthRequestEntity> {
        return await this.authRequestRepository.findOneBy({
            phone,
            expire: LessThanOrEqual(new Date())
        });
    }
}