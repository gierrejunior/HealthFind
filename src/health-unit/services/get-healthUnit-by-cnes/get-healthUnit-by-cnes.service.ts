import { Injectable } from "@nestjs/common";
import { HealthUnit } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class GetHealthUnitByCnes implements Service {
    constructor(private prisma: PrismaService) {}

    async execute(cnes: string): Promise<HealthUnit | null> {
        return await this.prisma.healthUnit.findUnique({
            where: {
                cnes,
            },
        });
    }
}
