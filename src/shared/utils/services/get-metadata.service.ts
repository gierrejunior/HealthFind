import { Injectable } from "@nestjs/common";

import { PaginationException } from "../../exceptions/pagination.excepetion";
import { MetadataPaginatedInfo } from "../../interfaces/response.interface";
import { Service } from "../../interfaces/service.interface";

/**
 * Get metadata object for paginated responses based on the given page,
 * count and limit.
 *
 * @returns the metadata object.
 */
@Injectable()
export class GetMetadataService implements Service {
    async execute(page: number, count: number, limit: number): Promise<MetadataPaginatedInfo> {
        const lastPageCalc = Math.ceil(count / limit);
        const lastPage = lastPageCalc > 0 ? lastPageCalc : 1;

        if (page > lastPage || page < 1) {
            throw new PaginationException();
        }

        return {
            type: "paginated",
            currentPage: page,
            next: lastPage > page ? page + 1 : null,
            prev: page > 1 ? page - 1 : null,
            lastPage,
            perPage: limit,
            total: count,
        };
    }
}
