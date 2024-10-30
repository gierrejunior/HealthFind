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

        // Verifica e decodifica o token JWT
        let decoded;
        try {
            decoded = await this.jwtService.verifyAsync(tokenHash);
        } catch {
            throw new UnauthorizedException("auth.error.invalid_or_expired_token");
        }

        // Busca o usuário no banco de dados pelo ID do token decodificado
        const user = await this.getUserByIdService.execute(decoded.sub);

        if (!user) {
            throw new UnauthorizedException("auth.error.user_not_found");
        }

        // Valida e retorna o objeto com base no UserSchema
        return UserSchema.parse(user);
    }
}
