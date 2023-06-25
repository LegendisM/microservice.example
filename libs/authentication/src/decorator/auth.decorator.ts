import { UseGuards, applyDecorators } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../guard/auth.guard";

export const Auth = () => {
    return applyDecorators(
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
    )
}