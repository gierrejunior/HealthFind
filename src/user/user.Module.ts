import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { GetMetadataService } from "src/shared/utils/services/get-metadata.service"; // Importe o GetMetadataService
import * as UserControllers from "./controllers";
import * as UserServices from "./services";

@Module({
    imports: [PrismaModule],
    controllers: [...Object.values(UserControllers)],
    providers: [...Object.values(UserServices), GetMetadataService], // Adicione o GetMetadataService aqui
    exports: [...Object.values(UserServices)],
})
export class UserModule {}
