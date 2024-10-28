// src/healthunits/controllers/delete-healthunit.controller.ts

import {
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { DeleteHealthUnitService } from "src/health-unit/services/delete-healthUnit/delete-healthUnit.service";

@Controller("healthunits")
@UseGuards(JWTGuard)
export class DeleteHealthUnitController {
    constructor(
        private readonly deleteHealthUnitService: DeleteHealthUnitService,
    ) {}

    @Delete(":id")
    @CheckAbilities(['delete', 'HealthUnits']) // Verificação de permissão via decorator
    async handle(@Param("id") id: string) {
        const healthUnit = await this.deleteHealthUnitService.findById(id);

        if (!healthUnit) {
            throw new NotFoundException("HealthUnit not found");
        }

        await this.deleteHealthUnitService.execute(id);

        return {
            message: "healthunit.delete.success",
            status: HttpStatus.OK,
        };
    }
}
