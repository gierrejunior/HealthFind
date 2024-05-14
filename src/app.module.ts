import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CreateHealthUnitController } from "./health-unit/controllers/create-health-unit.controller";
import { CreateUserController } from "./user/controllers/create-user.controller";
import { envSchema } from "./env";
import { PrismaService } from "./prisma/prisma.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [CreateUserController, CreateHealthUnitController],
    providers: [PrismaService, AuthModule],
})
export class AppModule {}
