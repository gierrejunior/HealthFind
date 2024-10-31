import {
    Body,
    Controller,
    HttpStatus,
    Param,
    Put,
    Req,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { AuthRequest } from "src/auth/interfaces/auth-request.interface";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { UserUpdateDTO, UserUpdateSchema } from "src/shared/dtos/user/user.update.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { UpdateUserService } from "../../services/update-user/update-user.service";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class UpdateUserController {
    constructor(private updateUserService: UpdateUserService) {}

    @Put(":id")
    @CheckAbilities(["update", "User"])
    async handle(
        @Param("id") id: string,
        @Body(new ZodValidationPipe(UserUpdateSchema)) data: UserUpdateDTO,
        @Req() req: AuthRequest,
    ) {
        const requester = req.user;

        // Verifica se o usuário a ser atualizado é o próprio usuário
        if (requester.role === Role.USER && requester.id !== id) {
            throw new UnauthorizedException("Users can only update their own information.");
        }

        // Se STAFF, impede a atualização do cityId e restringe os roles
        if (requester.role === Role.STAFF) {
            if (data.cityId) {
                throw new UnauthorizedException("STAFF cannot change cityId.");
            }
            if (data.role === Role.ADMIN) {
                throw new UnauthorizedException("STAFF cannot change role to ADMIN.");
            }
            // Permite mudar para STAFF, mas não para ADMIN
        }

        // Impede o USER de mudar seu papel
        if (data.role) {
            throw new UnauthorizedException("Users cannot change their role.");
        }

        // Chama o serviço para atualizar o usuário
        const updatedUser = await this.updateUserService.execute(id, data, requester.id);

        const userWithoutPassword = {
            ...updatedUser,
            password: undefined,
        };

        return {
            data: userWithoutPassword,
            message: "user.update.success",
            meta: null,
            status: HttpStatus.OK,
        };
    }
}
