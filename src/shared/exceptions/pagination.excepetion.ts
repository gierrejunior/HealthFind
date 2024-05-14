export class PaginationException extends Error {
    constructor(message = "HealthFind.invalidPaginationParameters") {
        super(message);
    }
}
