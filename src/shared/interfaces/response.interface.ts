/**
 * Represents a generic response body for a message broker.
 *
 * @template T The type of data that is returned by the message broker.
 * @property {} data The data that is returned by the message broker.
 * @property {number} status The HTTP status code of the response.
 * @property {string} message A message that describes the response.
 */
export interface BaseResponse<T> {
    data: T | null;
    meta: MetadataPaginatedInfo | MetadataError | null;
    status: number;
    message: string;
}

/**
 * Metadata for a paginated response.
 *
 * @property {number} total The total number of items available.
 * @property {number} lastPage The last page number.
 * @property {number} currentPage The current page number.
 * @property {number} perPage The number of items per page.
 * @property {number} prev The previous page number.
 * @property {number} next The next page number.
 */
export interface MetadataPaginatedInfo {
    type: "paginated";
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
}

export interface MetadataError {
    type: "error";
    info: string;
}
