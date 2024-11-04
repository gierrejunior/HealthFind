import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { GetMetadataService } from "src/shared/utils/services";
import { UserModule } from "src/user/user.Module";
import * as citiesControllers from "./controllers";
import * as citiesServices from "./services";

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [...Object.values(citiesControllers)],
    providers: [...Object.values(citiesServices), GetMetadataService],
})
export class CityModule {}
