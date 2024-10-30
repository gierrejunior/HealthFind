// src/healthunits/healthunits.controller.ts

import { Controller, Get, HttpStatus, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { GetHealthUnitByIdService } from "src/health-unit/services";

@Controller("healthunits")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class GetHealthUnitbyIdController {
    constructor(private readonly getHealthUnitByIdService: GetHealthUnitByIdService) {}

    @Get(":id")
    @CheckAbilities(["read", "HealthUnits"])
    async getHealthUnitById(@Param("id") id: string) {
        const healthUnit = await this.getHealthUnitByIdService.getHealthUnitById(id);

        if (!healthUnit) {
            throw new NotFoundException(`HealthUnit with ID ${id} not found`);
        }

        return {
            data: healthUnit,
            message: "user.get.success",
            meta: null,
            status: HttpStatus.OK,
        };
    }
}
