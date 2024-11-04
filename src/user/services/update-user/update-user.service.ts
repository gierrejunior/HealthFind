import { Injectable, NotFoundException } from "@nestjs/common";
import { Action, User } from "@prisma/client";
import { AuditLogService } from "src/audit-log/audit-log.service"; // Importa o serviço de auditoria
import { PrismaService } from "src/prisma/prisma.service";
import { UserUpdateDTO } from "src/shared/dtos/user/user.update.dto";

@Injectable()
export class UpdateUserService {
    constructor(
        private prisma: PrismaService,
        private auditLogService: AuditLogService, // Injeta o serviço de auditoria
    ) {}

    async execute(id: string, data: UserUpdateDTO, userId: string): Promise<User> {
        // Busca o usuário atual (estado antigo) para auditoria
        const oldUser = await this.prisma.user.findUnique({ where: { id } });
        if (!oldUser) {
            throw new NotFoundException("User not found");
        }

        // Sanitiza os dados de atualização, convertendo `null` para `undefined` para campos opcionais
        const sanitizedData = {
            ...data,
            role: data.role ?? undefined,
            cityId: data.cityId ?? undefined,
        };

        // Atualiza o usuário e captura o novo estado
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: sanitizedData,
        });

        // Registra o log de auditoria
        await this.auditLogService.logAction(
            id,
            "User",
            Action.UPDATE,
            userId,
            oldUser, // Estado antigo do usuário
            updatedUser, // Novo estado do usuário
        );

        return updatedUser;
    }
}
