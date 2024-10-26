import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DeleteUserService {
    constructor(private prisma: PrismaService) {}

    async execute(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // Deletar o usuário
        return await this.prisma.user.delete({
            where: { id },
        });
    }
}
