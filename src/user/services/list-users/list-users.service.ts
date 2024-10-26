import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Role } from "@prisma/client"; // Importa o Role para tipagem

@Injectable()
export class ListUsersService {
    constructor(private prisma: PrismaService) {}

    async execute(
        page: number, 
        limit: number, 
        role?: Role, // Define que role deve ser do tipo Role
        isActive?: boolean
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
            }),
            this.prisma.user.count({
                where: whereConditions,
            }),
        ]);

        return { users, count };
    }
}
