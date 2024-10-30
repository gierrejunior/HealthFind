// src/healthunits/controllers/delete-healthunit.controller.ts

import {
    Controller,
    Delete,
    HttpStatus,
    NotFoundException,
    Param,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { DeleteHealthUnitService } from "src/health-unit/services/delete-healthUnit/delete-healthUnit.service";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";

@Controller("healthunits")
@UseGuards(JWTGuard, CaslAbilityGuard)
export class DeleteHealthUnitController {
    constructor(private readonly deleteHealthUnitService: DeleteHealthUnitService) {}

    @Delete(":id")
    @CheckAbilities(["delete", "HealthUnit"]) // Verificação de permissão via decorator
    async handle(@Param("id") id: string, @Req() req: HealthFindRequest) {
        const healthUnit = await this.deleteHealthUnitService.findById(id);

        if (!healthUnit) {
            throw new NotFoundException("HealthUnit not found");
        }

        // Passa o ID do usuário que realizou a exclusão para o serviço de auditoria
        await this.deleteHealthUnitService.execute(id, req.user.id);

        return {
            message: "healthunit.delete.success",
            status: HttpStatus.OK,
        };
    }
}
