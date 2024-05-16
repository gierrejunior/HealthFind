import {
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash } from "bcryptjs";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import {
    UserRegistrationDTO,
    UserRegistrationSchema,
} from "src/shared/dtos/user/user.registration.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { Request } from "../../../shared/interfaces/request.interface";
import { CreateUserService, GetUserByEmailService, GetUserByUsernameService } from "../../services";

@Controller("users")
@UseGuards(JWTGuard)
export class CreateUserController {
    constructor(
        private jwt: JwtService,
        private getUserByEmailService: GetUserByEmailService,
        private getUserByUsernameService: GetUserByUsernameService,
        private createUserService: CreateUserService,
    ) {}

    @Post()
    async handle(
        @Body(new ZodValidationPipe(UserRegistrationSchema)) data: UserRegistrationDTO,
        @Req() request: Request,
    ) {
        const { username, email, password } = data;

        const requestUserRole = request.user.role;

        if (requestUserRole && requestUserRole == "USER") {
            throw new ForbiddenException("You do not have permission to create a user");
        }

        const userWithSameEmail = await this.getUserByEmailService.execute(email);

        if (userWithSameEmail) {
            throw new ConflictException("User with this email already exists");
        }

        const userWithSameUsername = await this.getUserByUsernameService.execute(username);

        if (userWithSameUsername) {
            throw new ForbiddenException("User with this username already exists");
        }

        data.password = await hash(password, 8);

        const user = await this.createUserService.execute(data);

        const userWithoutPassword = {
            ...user,
            password: undefined,
        };

        return {
            data: userWithoutPassword,
            message: "user.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
