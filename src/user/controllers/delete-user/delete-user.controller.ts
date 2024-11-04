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
import { Role } from "@prisma/client";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { RestrictedAccessGuard } from "src/auth/guard/restricted-access/restricted-access.guard";
import { AuthRequest } from "src/auth/interfaces/auth-request.interface";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { DeleteUserService } from "../../services/delete-user/delete.user";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard, RestrictedAccessGuard)
export class DeleteUserController {
    constructor(
        private deleteUserService: DeleteUserService,
        private prisma: PrismaService,
    ) {}

    @Delete(":id")
    @CheckAbilities(["delete", "User"])
    async handle(@Param("id") id: string, @Req() req: AuthRequest) {
        const requester = req.user;

        if (!requester || !requester.id) {
            throw new UnauthorizedException("User information is missing from the request.");
        }

        // Verifica se o usuário existe
        const userToDelete = await this.prisma.user.findUnique({
            where: { id },
            select: { cityId: true, role: true },
        });

        if (!userToDelete) {
            throw new NotFoundException("User not found");
        }

        // Restrições para STAFF e USER
        if (requester.role === Role.USER) {
            throw new UnauthorizedException("Users do not have permission to delete users.");
        }

        if (requester.role === Role.STAFF) {
            if (userToDelete.cityId !== requester.cityId) {
                throw new UnauthorizedException("STAFF can only delete users in their own city.");
            }
            if (userToDelete.role === Role.ADMIN) {
                throw new UnauthorizedException("STAFF cannot delete ADMIN users.");
            }
        }

        // Executa a exclusão
        const user = await this.deleteUserService.execute(id, requester.id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            message: "user.delete.success",
            status: HttpStatus.OK,
        };
    }
}
