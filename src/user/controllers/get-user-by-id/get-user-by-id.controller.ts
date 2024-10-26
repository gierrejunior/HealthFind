import {
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { GetUserByIdService } from "../../services";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard) // Adiciona o guard de habilidades
export class GetUserByIdController {
    constructor(private getUserByIdService: GetUserByIdService) {}

    @Get(":id")
    @CheckAbilities(['read', 'User']) // Verifica se o usuário tem permissão para ler
    async handle(@Param("id") id: string) {
        const user = await this.getUserByIdService.execute(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const userWithoutPassword = {
            ...user,
            password: undefined,
        };

        return {
            data: userWithoutPassword,
            message: "user.get.success",
            meta: null,
            status: HttpStatus.OK,
        };
    }
}
