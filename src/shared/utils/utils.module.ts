import { Global, Module } from "@nestjs/common";

import * as UtilsServices from "./services";

/**
 * Utils module.
 *
 * Provides utility services that can be used globally in the application.
 */
@Global()
@Module({
    providers: [...Object.values(UtilsServices)],
    exports: [...Object.values(UtilsServices)],
})
export class UtilsModule {}
