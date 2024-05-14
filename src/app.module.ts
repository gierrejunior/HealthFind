import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateController } from "./controllers/autheticate.controller";
import { CreateHealthUnitController } from "./controllers/create-health-unit.controller";
import { CreateUserController } from "./controllers/create-user.controller";
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
    controllers: [CreateUserController, AuthenticateController, CreateHealthUnitController],
    providers: [PrismaService],
})
export class AppModule {}
