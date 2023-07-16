import { Auth, CurrentUser } from "@app/authentication";
import { RabbitServiceName } from "@app/rabbit";
import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CreateCompanyInvitationDto } from "apps/company/src/dto/invitation/create-company-invitation.dto";
import { UserEntity } from "apps/user/src/entity/user.entity";

@ApiTags('Company Invitation Gateway')
@Controller({
    path: '/company-invitation',
    version: '1'
})
@Auth()
export class CompanyInvitationGatewayController {
    constructor(
        @Inject(RabbitServiceName.COMPANY) private companyClient: ClientProxy
    ) { }

    // TODO

    @Get('/:id')
    async getInvitationById(
        @Param('id', ParseUUIDPipe) id: string
    ) { }

    @Get('/code/:code')
    async getInvitationByCode(
        @Param('code') code: string
    ) { }

    @Post('/')
    async createInvitation(
        @Body() createDto: CreateCompanyInvitationDto,
        @CurrentUser() user: UserEntity
    ) { }

    @Delete('/:id')
    async removeInvitation(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: UserEntity
    ) { }

    @Get('/use/:id')
    async useInvitation(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: UserEntity
    ) { }
}