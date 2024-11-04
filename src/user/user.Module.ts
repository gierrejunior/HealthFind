// src/user/user.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { AuditLogModule } from "src/audit-log/audith-log.module";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { GetMetadataService } from "src/shared/utils/services/get-metadata.service"; // Importe o GetMetadataService
import * as UserControllers from "./controllers";
import * as UserServices from "./services";

@Module({
    imports: [
        PrismaModule,
        AuditLogModule,
        forwardRef(() => AuthModule), // Use forwardRef para resolver dependências circulares
    ],
    controllers: [...Object.values(UserControllers)],
    providers: [...Object.values(UserServices), GetMetadataService], // Adicione o GetMetadataService aqui
    exports: [...Object.values(UserServices)],
})
export class UserModule {}
