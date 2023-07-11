import { RabbitServiceName } from "@app/rabbit";
import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Company Member Gateway')
@Controller({
    path: '/company-member',
    version: '1'
})
export class CompanyMemberGatewayController {
    constructor(
        @Inject(RabbitServiceName.COMPANY) private companyClient: ClientProxy
    ) { }

    // TODO
    async createMember(){}
    async getMembers(){}
    async getMemberByUser(){}
    async removeMember(){}
    async getUserIsUnemployed(){}
}