import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CaslModule } from "./casl/casl.module"; // Importe o CaslModule
import { CityModule } from "./city/city.module";
import { envSchema } from "./env";
import { HealthUnitModule } from "./health-unit/health-unit.module";
import { PrismaService } from "./prisma/prisma.service";
import { UserModule } from "./user/user.Module";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthModule,
        CaslModule,
        UserModule,
        HealthUnitModule,
        CityModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
