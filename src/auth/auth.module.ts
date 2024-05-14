import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";
import { PrismaModule } from "src/prisma/prisma.module";
import * as AuthControllers from "./controllers";
import { JwtStrategy } from "./jwt.strategy";
import * as AuthServices from "./services";

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<Env, true>) {
                const privateKey = config.get<string>("JWT_PRIVATE_KEY", { infer: true });
                const publicKey = config.get<string>("JWT_PUBLIC_KEY", { infer: true });

                return {
                    signOptions: { algorithm: "RS256" },
                    privateKey: Buffer.from(privateKey, "base64").toString(),
                    publicKey: Buffer.from(publicKey, "base64").toString(),
                };
            },
        }),
    ],
    controllers: [...Object.values(AuthControllers)],
    providers: [...Object.values(AuthServices), JwtStrategy],
})
export class AuthModule {}
