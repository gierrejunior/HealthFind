import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDTO, UserSchema } from "src/shared/dtos/user/user.dto";
import { Service } from "src/shared/interfaces/service.interface";
import { GetUserByIdService } from "../get-user-by-id/get-user-by-id.service";

@Injectable()
export class GetUserFromTokenService implements Service {
    constructor(
        private readonly jwtService: JwtService,
        private readonly getUserByIdService: GetUserByIdService,
    ) {}

    async execute(token: string | undefined): Promise<UserDTO> {
        if (!token) {
            throw new UnauthorizedException("auth.error.no_token_provided");
        }

        // Supondo que o token venha no formato 'Bearer [token]'
        const [, tokenHash] = token.split(" ");

        try {
            const decoded = await this.jwtService.verifyAsync(tokenHash);

            const user = await this.getUserByIdService.execute(decoded.sub);

            return UserSchema.parse(user);
        } catch (error) {
            throw new UnauthorizedException("auth.error.invalid_token");
        }
    }
}
