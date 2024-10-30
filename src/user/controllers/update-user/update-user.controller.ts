import { Body, Controller, HttpStatus, Param, Put, Req, UseGuards } from "@nestjs/common";
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
    @CheckAbilities(["update", "User"]) // Verifica se o usuário tem permissão para atualizar
    async handle(
        @Param("id") id: string,
        @Body(new ZodValidationPipe(UserUpdateSchema)) data: UserUpdateDTO,
        @Req() req: AuthRequest, // Acessa o usuário autenticado
    ) {
        const userId = req.user.id; // Obtém o ID do usuário autenticado

        // Chama o serviço para atualizar o usuário
        const updatedUser = await this.updateUserService.execute(id, data, userId);

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
