import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ValidateCityService {
    constructor(private prisma: PrismaService) {}

    async execute(cityId: string) {
        const city = await this.prisma.city.findUnique({ where: { id: cityId } });
        if (!city) {
            throw new NotFoundException("Invalid cityId provided");
        }
        return city;
    }
}
