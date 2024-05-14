import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { BaseResponse } from "../../interfaces/response.interface";

/**
 * Catch all Zod errors and return a formatted response
 *
 * The body will be formatted as BaseResponse<null>;
 */
@Catch(ZodError)
export class ZodErrorFilter implements ExceptionFilter<ZodError> {
    async catch(error: ZodError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        console.error(error);

        const errors = fromZodError(error);

        if (errors.details.length >= 1) {
            return response.status(HttpStatus.BAD_REQUEST).send({
                data: null,
                message: errors.details[0].message,
                meta: null,
                status: HttpStatus.BAD_REQUEST,
            } as BaseResponse<null>);
        }

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            data: null,
            message: "HealthFind.unexpectedError",
            meta: null,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        } as BaseResponse<null>);
    }
}
