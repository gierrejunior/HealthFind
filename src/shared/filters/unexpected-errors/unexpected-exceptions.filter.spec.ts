import { ArgumentsHost } from "@nestjs/common";
import { FastifyReply } from "fastify";

import { UnexpectedExceptionsFilter } from "./unexpected-exceptions.filter";

describe("UnexpectedExceptionsFilter", () => {
    let filter: UnexpectedExceptionsFilter;

    let host: ArgumentsHost;
    let response: FastifyReply;

    beforeEach(() => {
        filter = new UnexpectedExceptionsFilter();

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

    it("should respond with status 500 and message", () => {
        filter.catch(new Error(), host);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.unexpectedError",
            meta: null,
            status: 500,
        });
    });
});
