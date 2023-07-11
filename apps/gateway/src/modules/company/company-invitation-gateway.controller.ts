import { RabbitServiceName } from "@app/rabbit";
import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Company Invitation Gateway')
@Controller({
    path: '/company-invitation',
    version: '1'
})
export class CompanyInvitationGatewayController {
    constructor(
        @Inject(RabbitServiceName.COMPANY) private companyClient: ClientProxy
    ) { }

    // TODO
    async createInvitation() { }
    async getInvitationById() { }
    async getInvitationByCode() { }
    async updateInvitation() { }
    async removeInvitation() { }
    async useInvitation() { }
}