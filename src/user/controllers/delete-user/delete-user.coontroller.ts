import {
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { DeleteUserService } from "../../services/delete-user/delete.user";

@Controller("users")
@UseGuards(JWTGuard)
export class DeleteUserController {
    constructor(private deleteUserService: DeleteUserService) {}

    @Delete(":id")
    @CheckAbilities(['delete', 'User']) // Verifica se o usuário tem permissão para deletar
    async handle(@Param("id") id: string) {
        const user = await this.deleteUserService.execute(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            message: "user.delete.success",
            status: HttpStatus.OK,
        };
    }
}
