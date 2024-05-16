import { Injectable } from "@nestjs/common";
import { HealthUnit } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetHealthUnitService {
    constructor(private prisma: PrismaService) {}

    async execute(params: {
        title?: string;
        description?: string;
    }): Promise<{ healthUnit: HealthUnit[]; count: number }> {
        const { title, description } = params;

        // Cria um objeto de condições de busca baseado nos parâmetros fornecidos
        const searchConditions = {};
        if (title) {
            searchConditions["title"] = {
                contains: title,
                mode: "insensitive", // busca não sensível a maiúsculas e minúsculas
            };
        }
        if (description) {
            searchConditions["description"] = {
                contains: description,
                mode: "insensitive",
            };
        }

        // Realiza a busca no banco de dados com as condições fornecidas
        const healthUnit = await this.prisma.healthUnit.findMany({
            where: searchConditions,
            // Adicione aqui outras opções de busca, como ordenação e paginação
        });

        // Conta o total de resultados encontrados
        const count = await this.prisma.healthUnit.count({ where: searchConditions });

        return { healthUnit, count };
    }
}
