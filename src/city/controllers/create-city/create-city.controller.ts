// city/controllers/city.controller.ts
import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guard/jwt-auth.guard";
import { CaslAbilityGuard } from "src/casl/casl-ability.guard";
import { CheckAbilities } from "src/casl/check-abilities.decorator";
import { CityService } from "src/city/services";
import { CreateCityDTO } from "src/shared/dtos/cities/create-cities.dto";

@Controller("cities")
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Post()
    @UseGuards(JWTGuard, CaslAbilityGuard)
    @CheckAbilities(["create", "city"])
    async createCity(@Body() createCityDto: CreateCityDTO) {
        try {
            return await this.cityService.createCity(createCityDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
