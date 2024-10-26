// src/user/services/update-user/update-user.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserUpdateDTO } from "src/shared/dtos/user/user.update.dto";

@Injectable()
export class UpdateUserService {
    constructor(private prisma: PrismaService) {}

    async execute(id: string, data: UserUpdateDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // Atualiza o usuário
        return await this.prisma.user.update({
            where: { id },
            data,
        });
    }
}
