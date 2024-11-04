import { Injectable, NotFoundException } from "@nestjs/common";
import { Action, User } from "@prisma/client";
import { AuditLogService } from "src/audit-log/audit-log.service"; // Importa o serviço de auditoria
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DeleteUserService {
    constructor(
        private prisma: PrismaService,
        private auditLogService: AuditLogService, // Injeta o serviço de auditoria
    ) {}

    async execute(id: string, userId: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // Registra o log de auditoria antes de deletar o usuário
        await this.auditLogService.logAction(
            id,
            "User",
            Action.DELETE,
            userId,
            user, // Estado antigo do usuário (antes da exclusão)
            undefined, // Define `newData` como `undefined` em vez de `null`
        );

        // Deleta o usuário
        return await this.prisma.user.delete({
            where: { id },
        });
    }
}
