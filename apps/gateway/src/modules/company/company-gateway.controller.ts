import { Auth, CurrentUser } from "@app/authentication";
import { IServiceResponse, RabbitServiceName } from "@app/rabbit";
import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { COMPANY_MESSAGE_PATTERNS } from "apps/company/src/constant/company-patterns.constant";
import { FindCompaniesDto } from "apps/company/src/dto/company/find-company.dto";
import { firstValueFrom } from "rxjs";
import { IGatewayResponse } from "../../common/interface/gateway.interface";
import { IPagination } from "@app/common";
import { CompanyEntity } from "apps/company/src/entity/company.entity";
import { CreateCompanyDto } from "apps/company/src/dto/company/create-company.dto";
import { UserEntity } from "apps/user/src/entity/user.entity";

@ApiTags('Company Gateway')
@Controller({
    path: '/companies',
    version: '1'
})
@Auth()
export class CompanyGatewayController {
    constructor(
        @Inject(RabbitServiceName.COMPANY) private companyClient: ClientProxy
    ) { }

    @Get('/')
    async getCompanies(@Query() findDto: FindCompaniesDto): Promise<IGatewayResponse<IPagination<CompanyEntity>>> {
        const { state, data: companies } = await firstValueFrom(
            this.companyClient.send<IServiceResponse<IPagination<CompanyEntity>>, FindCompaniesDto>(
                COMPANY_MESSAGE_PATTERNS.FIND_ALL,
                findDto
            )
        );
        return {
            state,
            data: companies
        };
    }

    @Get('/')
    async getCompanyById(@Param('id', ParseUUIDPipe) id: string): Promise<IGatewayResponse<CompanyEntity>> {
        const { state, data: company } = await firstValueFrom(
            this.companyClient.send<IServiceResponse<CompanyEntity>, string>(
                COMPANY_MESSAGE_PATTERNS.FIND_BY_ID,
                id
            )
        );
        return {
            state,
            data: company
        };
    }

    @Post('/')
    async createCompany(
        @Body() createDto: CreateCompanyDto,
        @CurrentUser() user: UserEntity
    ): Promise<IGatewayResponse<CompanyEntity>> {
        const { state, data: company } = await firstValueFrom(
            this.companyClient.send<IServiceResponse<CompanyEntity>, { createDto: CreateCompanyDto, user: UserEntity }>(
                COMPANY_MESSAGE_PATTERNS.CREATE,
                {
                    createDto,
                    user
                }
            )
        );
        return {
            state,
            data: company
        };
    }
}