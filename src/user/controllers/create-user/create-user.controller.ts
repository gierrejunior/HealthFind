import {
    Body,
    ConflictException,
    Controller,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import {
    UserRegistrationDTO,
    UserRegistrationSchema,
} from "src/shared/dtos/user/user.registration.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { CreateUserService, GetUserByEmailService, GetUserByUsernameService } from "../../services";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class CreateUserController {
    constructor(
        private jwt: JwtService,
        private getUserByEmailService: GetUserByEmailService,
        private getUserByUsernameService: GetUserByUsernameService,
        private createUserService: CreateUserService,
    ) {}

    @Post()
    @CheckAbilities(["create", "User"])
    async handle(
        @Body(new ZodValidationPipe(UserRegistrationSchema)) data: UserRegistrationDTO,
        @Req() request: HealthFindRequest,
    ) {
        const { username, email, password } = data;

        // Verifica se o e-mail ou username já existem
        const userWithSameEmail = await this.getUserByEmailService.execute(email);
        if (userWithSameEmail) {
            throw new ConflictException("User with this email already exists");
        }

        const userWithSameUsername = await this.getUserByUsernameService.execute(username);
        if (userWithSameUsername) {
            throw new ConflictException("User with this username already exists");
        }

        // Define o cityId com base no papel do usuário solicitante
        if (request.user.role === Role.STAFF) {
            // STAFF atribui seu próprio cityId ao novo USER
            data.cityId = request.user.cityId;
        } else if (request.user.role === Role.USER) {
            throw new ConflictException("Users cannot create new accounts");
        }

        // Hash da senha
        data.password = await hash(password, 8);

        // Chama o serviço para criar o usuário e passa o ID do usuário que está realizando a ação para auditoria
        const user = await this.createUserService.execute(data, request.user.id);

        // Remove a senha do objeto de retorno usando desestruturação
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
