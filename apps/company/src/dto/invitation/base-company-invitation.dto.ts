import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator";

export class BaseCompanyInvitationDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsDate()
    expire: Date;

    @ApiProperty()
    @IsBoolean()
    use: boolean;
}