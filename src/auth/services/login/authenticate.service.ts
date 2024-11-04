import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDTO } from "src/shared/dtos/user/user.dto";
import { Service } from "src/shared/interfaces/service.interface";
import { PaymentVerificationService } from "../payment-verification/payment-verification.service";

@Injectable()
export class AuthenticateService implements Service {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private paymentVerificationService: PaymentVerificationService,
    ) {}

    async execute(data: LoginDTO): Promise<{ accessToken: string; restrictedAccess: boolean }> {
        const { login, password } = data;

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: login }, { username: login }],
            },
        });

        if (!user) {
            throw new UnauthorizedException("User credentials do not match.");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("User credentials do not match.");
        }

        const hasPendingPayments = await this.paymentVerificationService.hasPendingPayments(
            user.cityId,
        );

        // Geração do token JWT
        const accessToken = this.jwt.sign({
            sub: user.id,
            role: user.role,
            restrictedAccess: hasPendingPayments,
        });

        return { accessToken, restrictedAccess: hasPendingPayments };
    }
}
