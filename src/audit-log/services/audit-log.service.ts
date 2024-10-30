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
        userId: string | null = null, // `userId` opcional
        oldData?: Record<string, any>, // Removido `null` como valor padrão
        newData?: Record<string, any>, // Removido `null` como valor padrão
    ): Promise<void> {
        try {
            await this.prisma.auditLog.create({
                data: {
                    entityId,
                    entityType,
                    action,
                    userId,
                    oldData: oldData ? JSON.stringify(oldData) : undefined, // Converte para JSON ou `undefined`
                    newData: newData ? JSON.stringify(newData) : undefined, // Converte para JSON ou `undefined`
                },
            });
        } catch (error) {
            console.error("Failed to create audit log:", error);
        }
    }
}
