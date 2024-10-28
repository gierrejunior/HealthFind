// src/healthunits/services/delete-healthunit/delete-healthunit.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { HealthUnit } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DeleteHealthUnitService {
    constructor(private prisma: PrismaService) {}

    async findById(id: string): Promise<HealthUnit | null> {
        return this.prisma.healthUnit.findUnique({ where: { id } });
    }

    async execute(id: string): Promise<void> {
        const healthUnit = await this.findById(id);

        if (!healthUnit) {
            throw new NotFoundException("HealthUnit not found");
        }

        // Execute deletion
        await this.prisma.healthUnit.delete({
            where: { id },
        });
    }
}
