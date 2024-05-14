import { Body, ConflictException, Controller, HttpStatus, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import {
    UserRegistrationDTO,
    UserRegistrationSchema,
} from "src/shared/dtos/user/user.registration.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("/registrations")
export class CreateUserController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(@Body(new ZodValidationPipe(UserRegistrationSchema)) data: UserRegistrationDTO) {
        const { username, firstName, lastName, email, password } = data;

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userWithSameEmail) {
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await hash(password, 8);

        await this.prisma.user.create({
            data: {
                username,
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        return {
            data: data,
            message: "user.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
