import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";

import { BaseResponse } from "../../interfaces/response.interface";

/**
 * Catch all unexpected exceptions and return a formatted response.
 *
 * Exceptions are only caught by this filter if they are not caught
 * by any other filter.
 *
 * The body will be formatted as BaseResponse<null>;
 */
@Catch()
export class UnexpectedExceptionsFilter implements ExceptionFilter {
    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        console.error(exception);

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            data: null,
            message: "HealthFind.unexpectedError",
            meta: null,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        } as BaseResponse<null>);
    }
}
