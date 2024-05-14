import {
    Body,
    Controller,
    HttpStatus,
    Post,
    UnauthorizedException,
    UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDTO, loginDTO } from "src/shared/dtos/user/user.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("/sessions")
export class AuthenticateController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(loginDTO))
    async handle(@Body() body: LoginDTO) {
        const { email, password } = body;

        const user = await this.prisma.user.findUnique({
            where: {
                email,
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

        return {
            data: accessToken,
            meta: null,
            message: "auth.login.success",
            status: HttpStatus.OK,
        };
    }
}
