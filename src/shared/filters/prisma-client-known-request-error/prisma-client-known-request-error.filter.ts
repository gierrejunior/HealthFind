import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FastifyReply } from "fastify";

import { BaseResponse } from "../../interfaces/response.interface";

/**
 * Catch all Prisma client known request errors and return a formatted response.
 *
 * Currently only catches P2025 errors.
 *
 * The body will be formatted as BaseResponse<null>;
 */
@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorFilter
    implements ExceptionFilter<PrismaClientKnownRequestError>
{
    async catch(error: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        console.error(error);

        /*
            P2025: "An operation failed because it depends on one or more
            records that were required but not found."
        */
        if (error.code === "P2025") {
            return response.status(HttpStatus.NOT_FOUND).send({
                data: null,
                message: "HealthFind.notFound",
                meta: {
                    type: "error",
                    info: `The resource was not found (${error?.meta?.target})`,
                },
                status: HttpStatus.NOT_FOUND,
            } as BaseResponse<null>);
        }

        if (error.code === "P2002") {
            return response.status(HttpStatus.CONFLICT).send({
                data: null,
                message: "HealthFind.conflict",
                meta: {
                    type: "error",
                    info: `The resource already exists. Some fields are unique and cannot be duplicated (${error?.meta?.target})`,
                },
                status: HttpStatus.CONFLICT,
            } as BaseResponse<null>);
        }

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            data: null,
            message: "HealthFind.unexpectedError",
            meta: {
                type: "error",
                info: error?.message ?? `An unexpected error occurred`,
            },
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        } as BaseResponse<null>);
    }
}
