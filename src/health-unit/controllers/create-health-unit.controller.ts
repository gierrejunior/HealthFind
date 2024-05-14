import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenDTO } from "src/shared/dtos/auth/token.dto";
import {
    CreateHealthUnitDTO,
    CreateHealthUnitSchema,
} from "src/shared/dtos/health-unit/create-healthUnit.dto";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("/healthunits")
@UseGuards(JwtAuthGuard)
export class CreateHealthUnitController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
    ) {}

    @Post()
    async handle(
        @Body(new ZodValidationPipe(CreateHealthUnitSchema)) data: CreateHealthUnitDTO,
        @CurrentUser() user: TokenDTO,
    ) {
        const healthUnit = await this.prisma.healthUnit.create({
            data: {
                ...data,
                CreatedBy: {
                    connect: { id: user.sub },
                },
            },
        });

        return {
            data: healthUnit,
            message: "healthUnit.create.success",
            meta: null,
            status: HttpStatus.CREATED,
        };
    }
}
