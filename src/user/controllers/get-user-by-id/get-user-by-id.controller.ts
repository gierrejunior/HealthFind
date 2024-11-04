import {
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Request,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { RestrictedAccessGuard } from "src/auth/guard/restricted-access/restricted-access.guard";
import { AuthRequest } from "src/auth/interfaces/auth-request.interface";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { GetUserByIdService } from "../../services";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard, RestrictedAccessGuard)
export class GetUserByIdController {
    constructor(private getUserByIdService: GetUserByIdService) {}

    @Get(":id")
    @CheckAbilities(["read", "User"])
    async handle(@Param("id") id: string, @Request() req: AuthRequest) {
        const requester = req.user;

        const user = await this.getUserByIdService.execute(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // Verifica se o usuário tem permissão para acessar informações de outra cidade
        if (requester.role !== "ADMIN" && user.cityId !== requester.cityId) {
            throw new UnauthorizedException("You do not have permission to access this user.");
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
