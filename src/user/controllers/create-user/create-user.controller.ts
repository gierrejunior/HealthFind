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
import {
    CreateUserService,
    GetUserByEmailService,
    GetUserByUsernameService,
    ValidateCityService,
} from "../../services";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class CreateUserController {
    constructor(
        private getUserByEmailService: GetUserByEmailService,
        private getUserByUsernameService: GetUserByUsernameService,
        private createUserService: CreateUserService,
        private validateCityService: ValidateCityService,
    ) {}

    @Post()
    @CheckAbilities(["create", "User"])
    async handle(
        @Body(new ZodValidationPipe(UserRegistrationSchema)) data: UserRegistrationDTO,
        @Req() request: HealthFindRequest,
    ) {
        const { username, email, password, role, cityId } = data;

        // Verifica se o e-mail ou username já existem
        const userWithSameEmail = await this.getUserByEmailService.execute(email);
        if (userWithSameEmail) {
            throw new ConflictException("User with this email already exists");
        }

        const userWithSameUsername = await this.getUserByUsernameService.execute(username);
        if (userWithSameUsername) {
            throw new ConflictException("User with this username already exists");
        }

        // Valida o cityId e o papel conforme o papel do usuário solicitante
        if (request.user.role === Role.STAFF) {
            if (role !== Role.USER && role !== Role.STAFF) {
                throw new ForbiddenException("STAFF can only assign USER or STAFF roles");
            }
            data.cityId = request.user.cityId; // STAFF atribui seu próprio cityId ao novo USER
        } else if (request.user.role === Role.ADMIN) {
            if (role !== Role.ADMIN && !cityId) {
                throw new ForbiddenException(
                    "ADMIN must provide a cityId when creating a USER or STAFF",
                );
            }
            if (role !== Role.ADMIN) {
                await this.validateCityService.execute(cityId as string); // Valida o cityId fornecido pelo ADMIN
            }
        } else if (request.user.role === Role.USER) {
            throw new ForbiddenException("Users cannot create new accounts");
        }

        // Hash da senha
        data.password = await hash(password, 8);

        // Criação do usuário com auditoria do ID do criador
        const user = await this.createUserService.execute(data, request.user.id);

        // Remove a senha do retorno
        const userWithoutPassword = { ...user, password: undefined };

        return {
            data: userWithoutPassword,
            message: "user.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
