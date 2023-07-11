import { RabbitServiceName } from "@app/rabbit";
import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Company Gateway')
@Controller({
    path: '/companies',
    version: '1'
})
export class CompanyGatewayController {
    constructor(
        @Inject(RabbitServiceName.COMPANY) private companyClient: ClientProxy
    ) { }

    // TODO
    // createCompany
    // getCompanies
    // getCompanyById
}