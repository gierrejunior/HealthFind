import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class GetUserByIdService implements Service {
    constructor(private prisma: PrismaService) {}

    async execute(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}
