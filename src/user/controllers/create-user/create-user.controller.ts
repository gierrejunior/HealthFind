import { Body, ConflictException, Controller, HttpStatus, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import {
    UserRegistrationDTO,
    UserRegistrationSchema,
} from "src/shared/dtos/user/user.registration.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { CreateUserService, GetUserByEmailService, GetUserByUsernameService } from "../../services";

@Controller("users")
export class CreateUserController {
    constructor(
        private getUserByEmailService: GetUserByEmailService,
        private getUserByUsernameService: GetUserByUsernameService,
        private createUserService: CreateUserService,
    ) {}

    @Post()
    async handle(@Body(new ZodValidationPipe(UserRegistrationSchema)) data: UserRegistrationDTO) {
        const { username, email, password } = data;

        const userWithSameEmail = await this.getUserByEmailService.execute(email);

        if (userWithSameEmail) {
            throw new ConflictException("User with this email already exists");
        }

        const userWithSameUsername = await this.getUserByUsernameService.execute(username);

        if (userWithSameUsername) {
            throw new ConflictException("User with this username already exists");
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
