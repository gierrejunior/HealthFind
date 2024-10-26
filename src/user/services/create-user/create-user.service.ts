import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRegistrationDTO } from "src/shared/dtos/user/user.registration.dto";
import { Service } from "src/shared/interfaces/service.interface";

@Injectable()
export class CreateUserService implements Service {
    constructor(private prisma: PrismaService) {}

    async execute(user: UserRegistrationDTO): Promise<User | null> {
        return await this.prisma.user.create({ data: user });
    }
}


