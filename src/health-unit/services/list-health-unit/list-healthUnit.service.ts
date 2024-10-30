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
        city?: string,
        state?: string,
        unitTypes?: string[], // Adiciona unitTypes como um parâmetro opcional
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
            ...(city && { city }),
            ...(state && { state }),
            ...(unitTypes && { unitType: { in: unitTypes } }), // Filtra por unitTypes, se fornecido
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
