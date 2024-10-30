// src/healthunits/services/delete-healthunit/delete-healthunit.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { Action, HealthUnit } from "@prisma/client";
import { AuditLogService } from "src/audit-log/services/audit-log.service"; // Importa o serviço de auditoria
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DeleteHealthUnitService {
    constructor(
        private prisma: PrismaService,
        private auditLogService: AuditLogService, // Injeta o serviço de auditoria
    ) {}

    async findById(id: string): Promise<HealthUnit | null> {
        return this.prisma.healthUnit.findUnique({ where: { id } });
    }

    async execute(id: string, userId: string): Promise<void> {
        const healthUnit = await this.findById(id);

        if (!healthUnit) {
            throw new NotFoundException("HealthUnit not found");
        }

        // Registra o log de auditoria antes de deletar a unidade de saúde
        await this.auditLogService.logAction(
            id,
            "HealthUnit",
            Action.DELETE,
            userId,
            healthUnit, // `oldData` com o estado da unidade antes da exclusão
            undefined, // `newData` é undefined, pois não há novo estado após a exclusão
        );

        // Executa a exclusão
        await this.prisma.healthUnit.delete({
            where: { id },
        });
    }
}
