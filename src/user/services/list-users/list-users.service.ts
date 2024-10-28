import { Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client"; // Importa o Role para tipagem
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ListUsersService {
    constructor(private prisma: PrismaService) {}

    async execute(
        page: number, 
        limit: number, 
        role?: Role, // Define que role deve ser do tipo Role
        isActive?: boolean,
        orderBy?: string, // Adiciona orderBy
        sortOrder?: 'asc' | 'desc' // Adiciona sortOrder
    ): Promise<{ users: User[]; count: number }> {
        const skip = (page - 1) * limit;

        const whereConditions = {
            role: role || undefined,
            isActive: isActive !== undefined ? isActive : undefined,
        };

        const [users, count] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                where: whereConditions,
                orderBy: orderBy ? { [orderBy]: sortOrder || 'asc' } : undefined, // Implementa a ordenação
            }),
            this.prisma.user.count({
                where: whereConditions,
            }),
        ]);

        return { users, count };
    }
}
