import { ArgumentsHost } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { ZodError } from "zod";

import { ZodErrorFilter } from "./zod-error.filter";

describe("ZodErrorFilter", () => {
    let filter: ZodErrorFilter;

    let host: ArgumentsHost;
    let response: FastifyReply;

    beforeEach(() => {
        filter = new ZodErrorFilter();

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

    it("should respond with status 400 and message if error has details", () => {
        filter.catch(
            new ZodError([
                {
                    code: "invalid_type",
                    expected: "string",
                    message: "Expected string, received number",
                    path: ["name"],
                    received: "number",
                },
            ]),
            host,
        );

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "Expected string, received number",
            meta: null,
            status: 400,
        });
    });

    it("should respond with interal server error if error has no details", () => {
        filter.catch(new ZodError([]), host);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.unexpectedError",
            meta: null,
            status: 500,
        });
    });
});
