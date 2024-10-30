// src/healthunits/services/update-healthunit/update-healthunit.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { Action, HealthUnit } from "@prisma/client";
import { AuditLogService } from "src/audit-log/services/audit-log.service"; // Importa o serviço de auditoria
import { PrismaService } from "src/prisma/prisma.service";
import { HealthUnitUpdateDTO } from "src/shared/dtos/health-unit/healthUnit-update.dto";

@Injectable()
export class UpdateHealthUnitService {
    constructor(
        private prisma: PrismaService,
        private auditLogService: AuditLogService, // Injeta o serviço de auditoria
    ) {}

    async execute(id: string, data: HealthUnitUpdateDTO, userId: string): Promise<HealthUnit> {
        // Busca o estado atual da unidade de saúde (antes da atualização)
        const oldHealthUnit = await this.prisma.healthUnit.findUnique({ where: { id } });

        if (!oldHealthUnit) {
            throw new NotFoundException("HealthUnit not found");
        }

        // Atualiza a unidade de saúde e captura o novo estado
        const updatedHealthUnit = await this.prisma.healthUnit.update({
            where: { id },
            data,
        });

        // Registra o log de auditoria
        await this.auditLogService.logAction(
            id,
            "HealthUnit",
            Action.UPDATE,
            userId,
            oldHealthUnit, // Estado antigo
            updatedHealthUnit, // Novo estado
        );

        return updatedHealthUnit;
    }
}
