import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import * as UserControllers from "./controllers";
import * as UserServices from "./services";

@Module({
    imports: [PrismaModule],
    controllers: [...Object.values(UserControllers)],
    providers: [...Object.values(UserServices)],
})
export class UserModule {}
