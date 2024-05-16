import { Controller, Get, HttpStatus, Query, Req } from "@nestjs/common";
import { HealthUnit } from "@prisma/client";
import { GetHealthUnitService } from "src/health-unit/services/get-health-unit/get-healthUnit.service";
import {
    GetHealthUnitQueryDTO,
    GetHealthUnitQuerySchema,
} from "src/shared/dtos/health-unit/get-healthUnit-query.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { BaseResponse } from "src/shared/interfaces/response.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";
import { GetMetadataService } from "src/shared/utils/services";

/**
 * Controller for getting all farms
 */
@Controller("healthunits")
export class GetHealthUnitController {
    constructor(
        private readonly getHealthUnitService: GetHealthUnitService,
        private readonly getMetadataService: GetMetadataService,
    ) {}

    @Get()
    async handle(
        @Req() req: HealthFindRequest,
        @Query(new ZodValidationPipe(GetHealthUnitQuerySchema)) query: GetHealthUnitQueryDTO,
    ): Promise<BaseResponse<HealthUnit[]>> {
        const { healthUnit, count } = await this.getHealthUnitService.execute({
            ...query,
        });

        const metadata = await this.getMetadataService.execute(query.page, count, query.limit);

        return {
            data: healthUnit,
            message: "healthUnit.get.success",
            meta: metadata,
            status: HttpStatus.OK,
        };
    }
}
