import { Controller, Get, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { ListHealthUnitService } from "src/health-unit/services";
import { PaginatedHealthUnitsResponseDTO } from "src/shared/dtos/health-unit/healthUnit.paginatedResponse.dto";
import { PaginationSchema } from "src/shared/dtos/pagination/pagination.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { GetMetadataService } from "src/shared/utils/services";

@Controller("healthunits")
@UseGuards(JWTGuard)
export class ListHealthUnitsController {
    constructor(
        private readonly listHealthUnitService: ListHealthUnitService,
        private readonly getMetadataService: GetMetadataService,
    ) {}

    @Get()
    @CheckAbilities(['read', 'HealthUnit']) 
    async handle(
        @Query(new ZodValidationPipe(PaginationSchema)) query: { page: number; limit: number },
        @Query("title") title?: string,
        @Query("description") description?: string,
        @Query("city") city?: string,
        @Query("state") state?: string,
        @Query("orderBy") orderBy?: string,
        @Query("sortOrder") sortOrder?: 'asc' | 'desc',
    ): Promise<PaginatedHealthUnitsResponseDTO> {
        const { page, limit } = query;


        const { healthUnits, count } = await this.listHealthUnitService.execute(
            page,
            limit,
            title,
            description,
            city,
            state,
            orderBy,
            sortOrder
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
