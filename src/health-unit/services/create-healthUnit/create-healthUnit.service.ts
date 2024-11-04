import { Injectable } from "@nestjs/common";
import { Action, HealthUnit } from "@prisma/client";
import { AuditLogService } from "src/audit-log/audit-log.service"; // Importa o serviço de auditoria
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHealthUnitDTO } from "src/shared/dtos/health-unit/create-healthUnit.dto";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class CreateHealthUnitService implements Service {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly auditLogService: AuditLogService, // Injeta o serviço de auditoria
    ) {}

    async execute(data: CreateHealthUnitDTO, userId: string): Promise<HealthUnit> {
        // Cria a unidade de saúde
        const newHealthUnit = await this.prismaService.healthUnit.create({
            data: {
                ...data,
                createdById: userId,
            },
        });

        // Registra o log de auditoria
        await this.auditLogService.logAction(
            newHealthUnit.id,
            "HealthUnit",
            Action.CREATE,
            userId,
            undefined, // `oldData` é undefined, pois não há estado anterior
            newHealthUnit, // `newData` é o estado da nova unidade de saúde
        );

        return newHealthUnit;
    }
}
