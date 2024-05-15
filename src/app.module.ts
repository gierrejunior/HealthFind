import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
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
        UserModule,
        HealthUnitModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
