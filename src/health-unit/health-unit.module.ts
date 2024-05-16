import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.Module";
import * as HealthUnitControllers from "./controllers";
import * as healthUnitServices from "./services";

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [...Object.values(HealthUnitControllers)],
    providers: [...Object.values(healthUnitServices)],
})
export class HealthUnitModule {}
