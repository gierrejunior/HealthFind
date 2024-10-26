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
import { Role } from "@prisma/client"; // Importa o Role para verificar o papel
import { hash } from "bcryptjs";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard"; // Importando o CaslAbilityGuard
import { CheckAbilities } from "src/casl/check-abilities.decorator"; // Importando o decorador
import {
    UserRegistrationDTO,
    UserRegistrationSchema,
} from "src/shared/dtos/user/user.registration.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { CreateUserService, GetUserByEmailService, GetUserByUsernameService } from "../../services";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard) // Adiciona o guard aqui
export class CreateUserController {
    constructor(
        private jwt: JwtService,
        private getUserByEmailService: GetUserByEmailService,
        private getUserByUsernameService: GetUserByUsernameService,
        private createUserService: CreateUserService,
    ) {}

    @Post()
    @CheckAbilities(['create', 'User']) // Especifica que o usuário deve ter permissão para criar um usuário
    async handle(
        @Body(new ZodValidationPipe(UserRegistrationSchema)) data: UserRegistrationDTO,
        @Req() request: HealthFindRequest,
    ) {
        const { username, email, password, role } = data;

        const requestUserRole = request.user.role;

        // Se o usuário é STAFF, ele só pode criar novos usuários com o papel USER
        if (requestUserRole === Role.STAFF && role && role !== Role.USER) {
            throw new ForbiddenException("STAFF can only create users with role USER");
        }

        // Se o usuário é USER, ele não pode criar novos usuários
        if (requestUserRole === Role.USER) {
            throw new ForbiddenException("You do not have permission to create a user");
        }

        // Verifica se o e-mail ou username já existem
        const userWithSameEmail = await this.getUserByEmailService.execute(email);
        if (userWithSameEmail) {
            throw new ConflictException("User with this email already exists");
        }

        const userWithSameUsername = await this.getUserByUsernameService.execute(username);
        if (userWithSameUsername) {
            throw new ConflictException("User with this username already exists");
        }

        // Define o papel como USER caso o papel não seja especificado ou se o criador for STAFF
        data.role = role && requestUserRole === Role.ADMIN ? role : Role.USER;

        // Hash da senha
        data.password = await hash(password, 8);

        const user = await this.createUserService.execute(data);

        // Remove a senha antes de retornar
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
