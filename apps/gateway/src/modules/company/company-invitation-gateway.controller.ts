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
    // createInvitation
    // getInvitationById
    // getInvitationByCode
    // updateInvitation
    // removeInvitation
    // useInvitation
}