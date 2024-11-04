import {
    Body,
    ConflictException,
    Controller,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { RestrictedAccessGuard } from "src/auth/guard/restricted-access/restricted-access.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { CreateHealthUnitService } from "src/health-unit/services";
import { GetHealthUnitByCnes } from "src/health-unit/services/get-healthUnit-by-cnes/get-healthUnit-by-cnes.service";
import {
    CreateHealthUnitDTO,
    CreateHealthUnitSchema,
} from "src/shared/dtos/health-unit/create-healthUnit.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("healthunits")
@UseGuards(JWTGuard, CaslAbilityGuard, RestrictedAccessGuard)
export class CreateHealthUnitController {
    constructor(
        private jwt: JwtService,
        private createHealthUnitService: CreateHealthUnitService,
        private getHealthUnitByCnes: GetHealthUnitByCnes,
    ) {}

    @Post()
    @CheckAbilities(["create", "HealthUnit"])
    async handle(
        @Body(new ZodValidationPipe(CreateHealthUnitSchema)) data: CreateHealthUnitDTO,
        @Req() request: HealthFindRequest,
    ) {
        const { user } = request;

        // Verifica se o CNES já existe antes de criar a unidade
        if (data.cnes) {
            const healthUnitWithSameCnes = await this.getHealthUnitByCnes.execute(data.cnes);
            if (healthUnitWithSameCnes) {
                throw new ConflictException("Health unit with this CNES already exists");
            }
        }

        // Define o `cityId` para STAFF e USER com base no usuário logado, garantindo que seja string
        if (user.role !== "ADMIN") {
            data.cityId = user.cityId as string; // Garantimos que `cityId` será string
        }

        // Cria a unidade de saúde e registra a auditoria
        const healthUnit = await this.createHealthUnitService.execute(data, user.id);

        return {
            data: healthUnit,
            message: "healthUnit.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
