import { Test, TestingModule } from "@nestjs/testing";

import { PaginationException } from "../../exceptions/pagination.excepetion";

import { GetMetadataService } from "./get-metadata.service";

describe("GetMetadataService", () => {
    let service: GetMetadataService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GetMetadataService],
        }).compile();

        service = module.get<GetMetadataService>(GetMetadataService);
    });

    it("should return metadata", async () => {
        const result = await service.execute(1, 1, 1);

        expect(result).toEqual({
            type: "paginated",
            currentPage: expect.any(Number),
            next: expect.toBeOneOf([null, expect.any(Number)]),
            prev: expect.toBeOneOf([null, expect.any(Number)]),
            lastPage: expect.any(Number),
            perPage: expect.any(Number),
            total: expect.any(Number),
        });
    });

    it("should return metadata with currentPage equal to page", async () => {
        const result = await service.execute(1, 1, 1);

        expect(result.currentPage).toEqual(1);
    });

    it("should return lastPage equal to 1 when count/limit is not greater than 0", async () => {
        const result = await service.execute(1, 0, 1);

        expect(result.lastPage).toEqual(1);
    });

    it("should return lastPage as count/limit if it is greater than 0", async () => {
        const result = await service.execute(1, 10, 5);

        expect(result.lastPage).toEqual(2);
    });

    it("should return next as page + 1 if lastPage is greater than page", async () => {
        const result = await service.execute(1, 10, 5);

        expect(result.next).toEqual(2);
    });

    it("should return next as null if lastPage is not greater than page", async () => {
        const result = await service.execute(2, 10, 5);

        expect(result.next).toEqual(null);
    });

    it("should return prev as page - 1 if page is greater than 1", async () => {
        const result = await service.execute(2, 10, 5);

        expect(result.prev).toEqual(1);
    });

    it("should return prev as null if page is not greater than 1", async () => {
        const result = await service.execute(1, 10, 5);

        expect(result.prev).toEqual(null);
    });

    it("should return perPage as limit", async () => {
        const result = await service.execute(1, 10, 5);

        expect(result.perPage).toEqual(5);
    });

    it("should return total as count", async () => {
        const result = await service.execute(1, 10, 5);

        expect(result.total).toEqual(10);
    });

    it("should throw PaginationException if page is greater than lastPage", async () => {
        try {
            expect(await service.execute(3, 10, 5));
        } catch (error) {
            if (error instanceof PaginationException) {
                expect(error.message).toEqual("ssxApi.invalidPaginationParameters");
            }
        }

        expect.assertions(1);
    });

    it("should throw PaginationException if page is less than 1", async () => {
        try {
            expect(await service.execute(-1, 10, 5));
        } catch (error) {
            if (error instanceof PaginationException) {
                expect(error.message).toEqual("ssxApi.invalidPaginationParameters");
            }
        }

        expect.assertions(1);
    });
});
