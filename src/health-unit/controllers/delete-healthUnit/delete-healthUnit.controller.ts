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

        // Verifica se o usuário tem permissão para deletar a unidade de saúde (se não for ADMIN, compara cityId)
        if (req.user.role !== "ADMIN" && healthUnit.cityId !== req.user.cityId) {
            throw new NotFoundException("HealthUnit not found in your city");
        }

        // Executa a exclusão e registra no serviço de auditoria usando o ID do usuário
        await this.deleteHealthUnitService.execute(id, req.user.id);

        return {
            message: "healthunit.delete.success",
            status: HttpStatus.OK,
        };
    }
}
