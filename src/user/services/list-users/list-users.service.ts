import { Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ListUsersService {
    constructor(private prisma: PrismaService) {}

    async execute(
        page: number,
        limit: number,
        role?: Role,
        isActive?: boolean,
        orderBy?: string,
        sortOrder?: "asc" | "desc",
        cityId?: string,
        userRole?: Role,
    ): Promise<{ users: User[]; count: number }> {
        const skip = (page - 1) * limit;

        const whereConditions: any = {
            ...(role ? { role } : {}), // Adiciona o filtro de papel se estiver definido
            ...(isActive !== undefined ? { isActive } : {}), // Inclui o filtro isActive se definido
        };

        // Adiciona a condição de cidade para STAFF e USER
        if (userRole === Role.ADMIN) {
            if (cityId) {
                whereConditions.cityId = cityId; // Permite o ADMIN filtrar por cidade opcionalmente
            }
        } else {
            whereConditions.cityId = cityId; // Filtra pela cidade vinculada ao usuário
        }

        const [users, count] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                where: whereConditions,
                orderBy: orderBy ? { [orderBy]: sortOrder || "asc" } : undefined,
            }),
            this.prisma.user.count({
                where: whereConditions,
            }),
        ]);

        return { users, count };
    }
}
