import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Injector } from "@nestjs/core/injector/injector";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDTO, LoginResponseDTO } from "src/shared/dtos/user/user.dto";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class AuthenticateService implements Service {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
    ) {}

    async execute(data: LoginDTO): Promise<LoginResponseDTO> {
        const { login, password } = data;

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: login }, { username: login }],
            },
        });

        if (!user) {
            throw new UnauthorizedException("User Credentials do not match.");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("User Credentials do not match.");
        }

        const accessToken = this.jwt.sign({ sub: user.id });

        return { accessToken };
    }
}
