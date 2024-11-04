// src/audit-log/audit-log.module.ts
import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuditLogService } from "./audit-log.service";

@Module({
    imports: [PrismaModule],
    providers: [AuditLogService],
    exports: [AuditLogService],
})
export class AuditLogModule {}
