import {
    ArgumentsHost,
    HttpException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";

import { HttpExceptionsFilter } from "./http-exceptions.filter";

describe("HttpExceptionsFilter", () => {
    let filter: HttpExceptionsFilter;

    let host: ArgumentsHost;
    let response: FastifyReply;

    beforeEach(() => {
        filter = new HttpExceptionsFilter();

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

    it("should respond with status 401 and message if exception is instance of UnauthorizedException", () => {
        filter.catch(new UnauthorizedException(), host);

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.unauthorized",
            meta: {
                type: "error",
                info: expect.any(String),
            },
            status: 401,
        });
    });

    it("should respond with status 404 and message if exception is instance of NotFoundException", () => {
        filter.catch(new NotFoundException(), host);

        expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.notFound",
            meta: {
                type: "error",
                info: expect.any(String),
            },
            status: HttpStatus.NOT_FOUND,
        });
    });

    it("should respond with error status and message if exception is instance of not caught HttpException", () => {
        const status = HttpStatus.FORBIDDEN;
        const message = "Forbidden";

        filter.catch(new HttpException(message, status), host);

        expect(response.status).toHaveBeenCalledWith(status);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message,
            meta: null,
            status,
        });
    });
});
