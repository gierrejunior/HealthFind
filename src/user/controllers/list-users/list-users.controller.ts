import { Controller, Get, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator"; // Importar o decorator
import { PaginationSchema } from "src/shared/dtos/pagination/pagination.dto";
import { PaginatedUsersResponseDTO } from "src/shared/dtos/user/user.paginatedResponse.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { GetMetadataService } from "src/shared/utils/services";
import { ListUsersService } from "src/user/services/list-users/list-users.service";

@Controller("users")
@UseGuards(JWTGuard)
export class ListUsersController {
    constructor(
        private readonly listUsersService: ListUsersService,
        private readonly getMetadataService: GetMetadataService,
    ) {}

    @Get()
    @CheckAbilities(['read', 'User']) 
    async handle(
        @Query(new ZodValidationPipe(PaginationSchema)) query: { page: number; limit: number },
        @Query("role") role?: Role,
        @Query("isActive") isActive?: string,
        @Query("orderBy") orderBy?: string, // Adiciona orderBy
        @Query("sortOrder") sortOrder?: 'asc' | 'desc' // Adiciona sortOrder
    ): Promise<PaginatedUsersResponseDTO> {
        const { page, limit } = query;
        const isActiveBoolean = isActive === "true" ? true : isActive === "false" ? false : undefined;

        const { users, count } = await this.listUsersService.execute(
            page,
            limit,
            role,
            isActiveBoolean,
            orderBy,   // Passa orderBy
            sortOrder   // Passa sortOrder
        );

        const metadata = await this.getMetadataService.execute(page, count, limit);

        // Remove o campo password de cada usuário
        const usersWithoutPasswords = users.map(user => ({
            ...user,
            password: undefined,
        }));

        return {
            data: usersWithoutPasswords,
            message: "users.list.success",
            meta: metadata,
            status: HttpStatus.OK,
        };
    }
}
