import { Controller, Get, HttpStatus, Query, Req, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { ListHealthUnitService } from "src/health-unit/services";
import { PaginatedHealthUnitsResponseDTO } from "src/shared/dtos/health-unit/healthUnit.paginatedResponse.dto";
import { PaginationSchema } from "src/shared/dtos/pagination/pagination.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { GetMetadataService } from "src/shared/utils/services";

@Controller("healthunits")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class ListHealthUnitsController {
    constructor(
        private readonly listHealthUnitService: ListHealthUnitService,
        private readonly getMetadataService: GetMetadataService,
    ) {}

    @Get()
    @CheckAbilities(["read", "HealthUnit"])
    async handle(
        @Req() request: HealthFindRequest, // Adiciona a requisição para acessar o usuário logado
        @Query(new ZodValidationPipe(PaginationSchema)) query: { page: number; limit: number },
        @Query("title") title?: string,
        @Query("description") description?: string,
        @Query("city") city?: string,
        @Query("state") state?: string,
        @Query("unitTypes") unitTypes?: string[],
        @Query("orderBy") orderBy?: string,
        @Query("sortOrder") sortOrder?: "asc" | "desc",
    ): Promise<PaginatedHealthUnitsResponseDTO> {
        const { page, limit } = query;
        const { user } = request;

        // Filtra cityId automaticamente para STAFF e USER, permitindo escolha apenas para ADMIN
        const cityIdFilter = user.role === "ADMIN" ? city : user.cityId;

        const { healthUnits, count } = await this.listHealthUnitService.execute(
            page,
            limit,
            title,
            description,
            cityIdFilter || undefined,
            state,
            unitTypes,
            orderBy,
            sortOrder,
        );

        const metadata = await this.getMetadataService.execute(page, count, limit);

        return {
            data: healthUnits,
            message: "healthunits.list.success",
            meta: metadata,
            status: HttpStatus.OK,
        };
    }
}
