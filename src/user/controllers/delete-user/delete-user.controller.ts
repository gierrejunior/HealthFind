import {
    Controller,
    Delete,
    HttpStatus,
    NotFoundException,
    Param,
    Req,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { AuthRequest } from "src/auth/interfaces/auth-request.interface";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { DeleteUserService } from "../../services/delete-user/delete.user";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class DeleteUserController {
    constructor(private deleteUserService: DeleteUserService) {}

    @Delete(":id")
    @CheckAbilities(["delete", "User"])
    async handle(@Param("id") id: string, @Req() req: AuthRequest) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException("User information is missing from the request.");
        }

        const userId = req.user.id;

        const user = await this.deleteUserService.execute(id, userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            message: "user.delete.success",
            status: HttpStatus.OK,
        };
    }
}
