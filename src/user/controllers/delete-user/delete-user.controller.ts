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
import { PrismaService } from "src/prisma/prisma.service";
import { DeleteUserService } from "../../services/delete-user/delete.user";

@Controller("users")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class DeleteUserController {
    constructor(
        private deleteUserService: DeleteUserService,
        private prisma: PrismaService,
    ) {}

    @Delete(":id")
    @CheckAbilities(["delete", "User"])
    async handle(@Param("id") id: string, @Req() req: AuthRequest) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException("User information is missing from the request.");
        }

        const userId = req.user.id;
        const requester = req.user;

        // Verifique se o usuário a ser deletado pertence à mesma cidade para STAFF e USER
        const userToDelete = await this.prisma.user.findUnique({
            where: { id },
            select: { cityId: true },
        });

        if (!userToDelete) {
            throw new NotFoundException("User not found");
        }

        // Impede STAFF e USER de deletarem usuários de outra cidade
        if (requester.role !== "ADMIN" && userToDelete.cityId !== requester.cityId) {
            throw new UnauthorizedException("You do not have permission to delete this user.");
        }

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
