import { Module } from "@nestjs/common";
import { AuditLogModule } from "src/audit-log/audith-log.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { GetMetadataService } from "src/shared/utils/services/get-metadata.service"; // Importe o GetMetadataService
import * as UserControllers from "./controllers";
import * as UserServices from "./services";

@Module({
    imports: [PrismaModule, AuditLogModule],
    controllers: [...Object.values(UserControllers)],
    providers: [...Object.values(UserServices), GetMetadataService], // Adicione o GetMetadataService aqui
    exports: [...Object.values(UserServices)],
})
export class UserModule {}
