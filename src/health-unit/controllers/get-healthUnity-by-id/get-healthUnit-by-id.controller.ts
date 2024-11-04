import {
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { RestrictedAccessGuard } from "src/auth/guard/restricted-access/restricted-access.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { GetHealthUnitByIdService } from "src/health-unit/services";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";

@Controller("healthunits")
@UseGuards(JWTGuard, CaslAbilityGuard, RestrictedAccessGuard)
export class GetHealthUnitbyIdController {
    constructor(private readonly getHealthUnitByIdService: GetHealthUnitByIdService) {}

    @Get(":id")
    @CheckAbilities(["read", "HealthUnit"])
    async getHealthUnitById(@Param("id") id: string, @Req() req: HealthFindRequest) {
        const healthUnit = await this.getHealthUnitByIdService.getHealthUnitById(id);

        if (!healthUnit) {
            throw new NotFoundException(`HealthUnit with ID ${id} not found`);
        }

        // Verificação de cidade: Usuários STAFF e USER só podem acessar unidades na mesma cidade
        if (req.user.role !== "ADMIN" && healthUnit.cityId !== req.user.cityId) {
            throw new NotFoundException("HealthUnit not found in your city");
        }

        return {
            data: healthUnit,
            message: "healthunit.get.success",
            meta: null,
            status: HttpStatus.OK,
        };
    }
}
