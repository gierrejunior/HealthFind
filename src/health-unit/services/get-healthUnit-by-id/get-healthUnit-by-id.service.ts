// src/healthunits/healthunits.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetHealthUnitByIdService {
    constructor(private prisma: PrismaService) {}

    async getHealthUnitById(id: string) {
        const healthUnit = await this.prisma.healthUnit.findUnique({
            where: { id },
        });

        if (!healthUnit) {
            throw new NotFoundException(`HealthUnit with ID ${id} not found`);
        }

        return healthUnit;
    }
}
