import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CreateHealthUnitService } from "src/health-unit/services";
import { TokenDTO } from "src/shared/dtos/auth/token.dto";
import {
    CreateHealthUnitDTO,
    CreateHealthUnitSchema,
} from "src/shared/dtos/health-unit/create-healthUnit.dto";
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
        @CurrentUser() user: TokenDTO,
    ) {
        const healthUnit = await this.createHealthUnitService.execute(data, user.sub);

        return {
            data: healthUnit,
            message: "healthUnit.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
