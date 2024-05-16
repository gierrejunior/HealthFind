import { Body, Controller, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CreateHealthUnitService } from "src/health-unit/services";
import {
    CreateHealthUnitDTO,
    CreateHealthUnitSchema,
} from "src/shared/dtos/health-unit/create-healthUnit/create-healthUnit.dto";
import { HealthFindRequest } from "src/shared/interfaces/healthFindRequest.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("healthunits")
@UseGuards(JWTGuard)
export class CreateHealthUnitController {
    constructor(
        private jwt: JwtService,
        private createHealthUnitService: CreateHealthUnitService,
    ) {}

    @Post()
    async handle(
        @Body(new ZodValidationPipe(CreateHealthUnitSchema)) data: CreateHealthUnitDTO,
        @Req() request: HealthFindRequest,
    ) {
        const healthUnit = await this.createHealthUnitService.execute(data, request.user.id);

        return {
            data: healthUnit,
            message: "healthUnit.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
