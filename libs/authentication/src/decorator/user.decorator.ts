import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    return data ? user?.[data] : user;
});