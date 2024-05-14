import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "./env";
import {
    HttpExceptionsFilter,
    PrismaClientKnownRequestErrorFilter,
    UnexpectedExceptionsFilter,
    ZodErrorFilter,
} from "./shared/filters";
import { PaginationExceptionFilter } from "./shared/filters/pagination-exception/pagination-exception.filter";
import { ResponseStatusInterceptor } from "./shared/interceptors/response.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalInterceptors(
        new ResponseStatusInterceptor(),
    );
    app.useGlobalFilters(
        new UnexpectedExceptionsFilter(),
        new HttpExceptionsFilter(),
        new PrismaClientKnownRequestErrorFilter(),
        new ZodErrorFilter(),
        new PaginationExceptionFilter(),
    );

    const configService = app.get<ConfigService<Env, true>>(ConfigService);
    const port = configService.get("PORT", { infer: true });

    await app.listen(port);
}
bootstrap();
