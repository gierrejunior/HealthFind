import { Injectable } from "@nestjs/common";
import { Action, User } from "@prisma/client";
import { AuditLogService } from "src/audit-log/services/audit-log.service"; // Importa o serviço de auditoria
import { PrismaService } from "src/prisma/prisma.service";
import { UserRegistrationDTO } from "src/shared/dtos/user/user.registration.dto";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class CreateUserService implements Service {
    constructor(
        private prisma: PrismaService,
        private auditLogService: AuditLogService, // Injeta o serviço de auditoria
    ) {}

    async execute(user: UserRegistrationDTO, createdById: string): Promise<User> {
        // Sanitiza o objeto `user`, convertendo `null` em `undefined` para campos opcionais
        const sanitizedUser = {
            ...user,
            role: user.role ?? undefined,
            cityId: user.cityId ?? undefined,
        };

        // Cria o usuário
        const newUser = await this.prisma.user.create({ data: sanitizedUser });

        // Registra o log de auditoria
        await this.auditLogService.logAction(
            newUser.id,
            "User",
            Action.CREATE,
            createdById,
            undefined, // `oldData` é undefined, pois não há estado anterior
            newUser, // `newData` é o estado do novo usuário
        );

        return newUser;
    }
}
