// src/audit-log/audit-log.service.ts
import { Injectable } from "@nestjs/common";
import { Action } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuditLogService {
    constructor(private readonly prisma: PrismaService) {}

    async logAction(
        entityId: string,
        entityType: string,
        action: Action,
        userId: string | null = null,
        oldData?: Record<string, any>,
        newData?: Record<string, any>,
    ): Promise<void> {
        try {
            await this.prisma.auditLog.create({
                data: {
                    entityId,
                    entityType,
                    action,
                    userId,
                    oldData: oldData ? JSON.stringify(oldData) : undefined,
                    newData: newData ? JSON.stringify(newData) : undefined,
                },
            });
        } catch (error) {
            console.error("Failed to create audit log:", error);
        }
    }
}
