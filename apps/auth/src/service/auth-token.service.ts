import { Injectable } from "@nestjs/common";
import { IJwtPayload, IJwtToken } from "../interface/token.interface";
import { IServiceResponse } from "@app/rabbit";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthTokenService {
    constructor(
        private jwtService: JwtService
    ) { }

    async create(payload: IJwtPayload): Promise<IServiceResponse<IJwtToken>> {
        const token = await this.jwtService.signAsync(payload);
        return {
            state: !!token,
            data: { token },
            message: `auth.operation-${!!token ? 'completed' : 'failed'}`
        }
    }

    async validate({ token }: IJwtToken): Promise<IServiceResponse<boolean>> {
        let isValid: boolean;

        await this.jwtService.verifyAsync(token)
            .then(() => { isValid = true; })
            .catch(() => { isValid = false });

        return {
            state: isValid,
            data: isValid,
            message: `auth.operation-${isValid ? 'completed' : 'failed'}`
        };
    }
}