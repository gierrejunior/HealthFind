import { ConflictException, Injectable } from "@nestjs/common";
import { HealthUnit } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHealthUnitDTO } from "src/shared/dtos/health-unit/create-healthUnit.dto";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class CreateHealthUnitService implements Service {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(data: CreateHealthUnitDTO, userId: string): Promise<HealthUnit> {
        try {
            return await this.prismaService.healthUnit.create({
                data: {
                    ...data,
                    createdById: userId, // Assume que há uma coluna `createdById` no modelo de saúde
                },
            });
        } catch (error) {
            // Aqui você pode lidar com erros específicos
            throw new ConflictException("Health unit could not be created."); // Exemplo de tratamento de erro
        }
    }
}
