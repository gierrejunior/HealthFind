import { Module } from "@nestjs/common";
import { AuditLogModule } from "src/audit-log/audith-log.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { GetMetadataService } from "src/shared/utils/services";
import { UserModule } from "src/user/user.Module";
import * as HealthUnitControllers from "./controllers";
import * as healthUnitServices from "./services";

@Module({
    imports: [PrismaModule, UserModule, AuditLogModule],
    controllers: [...Object.values(HealthUnitControllers)],
    providers: [...Object.values(healthUnitServices), GetMetadataService],
})
export class HealthUnitModule {}
