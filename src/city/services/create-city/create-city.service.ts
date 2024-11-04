// city/services/city.service.ts
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCityDTO } from "src/shared/dtos/cities/create-cities.dto";

@Injectable()
export class CityService {
    constructor(private prisma: PrismaService) {}

    async createCity(createCityDto: CreateCityDTO) {
        const { cnpj } = createCityDto;

        // Verificar se a cidade já existe baseado apenas no CNPJ
        const existingCity = await this.prisma.city.findUnique({
            where: { cnpj },
        });

        if (existingCity) {
            throw new HttpException("Cidade com este CNPJ já cadastrada", HttpStatus.CONFLICT);
        }

        // Criar a nova cidade
        return this.prisma.city.create({ data: createCityDto });
    }
}
