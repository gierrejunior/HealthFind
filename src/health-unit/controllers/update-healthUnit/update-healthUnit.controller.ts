// src/healthunits/controllers/update-healthunit.controller.ts

import { Body, Controller, HttpStatus, Param, Put, Req, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { UpdateHealthUnitService } from "src/health-unit/services/update-healthUnit/update-healthUnit.service";
import {
    HealthUnitUpdateDTO,
    HealthUnitUpdateSchema,
} from "src/shared/dtos/health-unit/healthUnit-update.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("healthunits")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class UpdateHealthUnitController {
    constructor(private readonly updateHealthUnitService: UpdateHealthUnitService) {}

    @Put(":id")
    @CheckAbilities(["update", "HealthUnit"]) // Verifica se o usuário tem permissão para atualizar
    async handle(
        @Param("id") id: string,
        @Body(new ZodValidationPipe(HealthUnitUpdateSchema)) data: HealthUnitUpdateDTO,
        @Req() req: HealthFindRequest,
    ) {
        const userId = req.user.id;

        // Chama o serviço de atualização da unidade de saúde
        const updatedHealthUnit = await this.updateHealthUnitService.execute(id, data, userId);

        return {
            data: updatedHealthUnit,
            message: "healthUnit.update.success",
            meta: null,
            status: HttpStatus.OK,
        };
    }
}
