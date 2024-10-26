// src/user/controllers/update-user/update-user.controller.ts
import { Body, Controller, HttpStatus, Param, Put, Req, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { UserUpdateDTO, UserUpdateSchema } from "src/shared/dtos/user/user.update.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { UpdateUserService } from "../../services/update-user/update-user.service";

@Controller("users")
@UseGuards(JWTGuard)
export class UpdateUserController {
    constructor(private updateUserService: UpdateUserService) {}

    @Put(":id")
    @CheckAbilities(['update', 'User']) // Verifica se o usuário tem permissão para atualizar
    async handle(
        @Param("id") id: string,
        @Body(new ZodValidationPipe(UserUpdateSchema)) data: UserUpdateDTO,
        @Req() request: HealthFindRequest,
    ) {
        const updatedUser = await this.updateUserService.execute(id, data);
        
        return {
            data: {
                ...updatedUser,
                password: undefined, // Remove a senha do retorno
            },
            message: "user.update.success",
            meta: null,
            status: HttpStatus.OK,
        };
    }
}
