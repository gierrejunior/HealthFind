import { Injectable } from "@nestjs/common";
import { HealthUnit } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHealthUnitDTO } from "src/shared/dtos/health-unit/create-healthUnit/create-healthUnit.dto";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class CreateHealthUnitService implements Service {
    constructor(private Prisma: PrismaService) {}

    async execute(healthUnit: CreateHealthUnitDTO, userId: string): Promise<HealthUnit> {
        return await this.Prisma.healthUnit.create({
            data: {
                ...healthUnit,
                CreatedBy: {
                    connect: { id: userId },
                },
            },
        });
    }
}
