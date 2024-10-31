import { Injectable } from "@nestjs/common";
import { HealthUnit, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ListHealthUnitService {
    constructor(private prisma: PrismaService) {}

    async execute(
        page: number,
        limit: number,
        title?: string,
        description?: string,
        cityId?: string, // `cityId` para filtrar pelo município
        state?: string,
        unitTypes?: string[],
        orderBy?: string,
        sortOrder?: "asc" | "desc",
    ): Promise<{ healthUnits: HealthUnit[]; count: number }> {
        const skip = (page - 1) * limit;

        // Cria um objeto de condições de busca baseado nos parâmetros fornecidos
        const searchConditions: Prisma.HealthUnitWhereInput = {
            ...(title && {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            }),
            ...(description && {
                description: {
                    contains: description,
                    mode: "insensitive",
                },
            }),
            ...(cityId && { cityId }), // Filtra pelo cityId associado ao usuário ou especificado
            ...(state && { state }),
            ...(unitTypes && { unitType: { in: unitTypes } }),
        };

        // Realiza a busca no banco de dados com as condições fornecidas
        const healthUnits = await this.prisma.healthUnit.findMany({
            where: searchConditions,
            skip,
            take: limit,
            orderBy: orderBy ? { [orderBy]: sortOrder || "asc" } : undefined,
        });

        // Conta o total de resultados encontrados
        const count = await this.prisma.healthUnit.count({ where: searchConditions });

        return { healthUnits, count };
    }
}
