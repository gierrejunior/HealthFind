import { ArgumentsHost } from "@nestjs/common";
import { FastifyReply } from "fastify";

import { PaginationException } from "../../exceptions/pagination.excepetion";

import { PaginationExceptionFilter } from "./pagination-exception.filter";

describe("PaginationExceptionFilter", () => {
    let filter: PaginationExceptionFilter;

    let host: ArgumentsHost;
    let response: FastifyReply;

    beforeEach(() => {
        filter = new PaginationExceptionFilter();

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

    it("should return a BaseResponse with status 400 and error message", async () => {
        const exception = new PaginationException();

        await filter.catch(exception, host);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.send).toHaveBeenCalledWith({
            data: null,
            message: "HealthFind.invalidPaginationParameters",
            meta: null,
            status: 400,
        });
    });
});
