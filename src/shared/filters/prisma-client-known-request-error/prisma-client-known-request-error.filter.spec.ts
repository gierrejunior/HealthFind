import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FastifyReply } from "fastify";

import { PrismaClientKnownRequestErrorFilter } from "./prisma-client-known-request-error.filter";

describe("AllExceptionsFilter", () => {
    let filter: PrismaClientKnownRequestErrorFilter;

    let host: ArgumentsHost;
    let response: FastifyReply;

    beforeEach(() => {
        filter = new PrismaClientKnownRequestErrorFilter();

        response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        } as unknown as FastifyReply;
        host = {
            switchToHttp: jest.fn(() => ({
                getResponse: jest.fn(() => response),
            })),
        } as unknown as ArgumentsHost;
    });

    beforeAll(() => {
        console.error = jest.fn();
    });

    it("should respond with status 404 if error code is P2025", () => {
        filter.catch(
            new PrismaClientKnownRequestError("Prisma not found error", {
                clientVersion: "2.0.0",
                code: "P2025",
                batchRequestIdx: 0,
            }),
            host,
        );

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.notFound",
            meta: {
                type: "error",
                info: expect.stringContaining("The resource was not found"),
            },
            status: 404,
        });
    });

    it("should respond with status 409 if error code is P2002", () => {
        filter.catch(
            new PrismaClientKnownRequestError("Prisma conflict error", {
                clientVersion: "2.0.0",
                code: "P2002",
                batchRequestIdx: 0,
            }),
            host,
        );

        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.conflict",
            meta: {
                type: "error",
                info: expect.stringContaining(
                    "The resource already exists. Some fields are unique and cannot be duplicated",
                ),
            },
            status: HttpStatus.CONFLICT,
        });
    });

    it("should respond with interal server error if error code is not caught", () => {
        filter.catch(
            new PrismaClientKnownRequestError("Prisma unknown error", {
                clientVersion: "2.0.0",
                code: "P2000",
                batchRequestIdx: 0,
            }),
            host,
        );

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.unexpectedError",
            meta: {
                type: "error",
                info: expect.any(String),
            },
            status: 500,
        });
    });
});
