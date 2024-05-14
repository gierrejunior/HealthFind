import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";

import { BaseResponse } from "../../interfaces/response.interface";

/**
 * Catch all http exceptions and return a formatted response.
 *
 * The body will be formatted as BaseResponse<null>;
 */
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter<HttpException> {
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        console.error(exception);

        if (exception instanceof NotFoundException) {
            return response.status(HttpStatus.NOT_FOUND).send({
                data: null,
                message: "HealthFind.notFound",
                meta: {
                    type: "error",
                    info: exception.message,
                },
                status: HttpStatus.NOT_FOUND,
            } as BaseResponse<null>);
        }

        if (exception instanceof UnauthorizedException) {
            return response.status(HttpStatus.UNAUTHORIZED).send({
                data: null,
                message: "HealthFind.unauthorized",
                meta: {
                    type: "error",
                    info: exception.message,
                },
                status: HttpStatus.UNAUTHORIZED,
            } as BaseResponse<null>);
        }

        if (exception instanceof ForbiddenException) {
            return response.status(HttpStatus.FORBIDDEN).send({
                data: null,
                message: "HealthFind.forbidden",
                meta: {
                    type: "error",
                    info: exception.message,
                },
                status: HttpStatus.FORBIDDEN,
            } as BaseResponse<null>);
        }

        const status = exception.getStatus();

        return response.status(status).send({
            data: null,
            message: exception.message,
            meta: null,
            status,
        } as BaseResponse<null>);
    }
}
