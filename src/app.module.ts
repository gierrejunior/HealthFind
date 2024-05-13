import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";

@Module({
    imports: [],
    controllers: [AppController, PrismaService],
    providers: [AppService],
})
export class AppModule {}
