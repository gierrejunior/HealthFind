// user.paginatedResponse.dto.ts
import { z } from "zod";
import { UserSchema } from "./user.dto";

export const PaginationMetadataSchema = z.object({
    type: z.literal("paginated"),
    currentPage: z.number(),
    next: z.number().nullable(),
    prev: z.number().nullable(),
    lastPage: z.number(),
    perPage: z.number(),
    total: z.number(),
});

export const PaginatedUsersResponseSchema = z.object({
    data: z.array(UserSchema),
    message: z.string().default("users.list.success"),
    meta: PaginationMetadataSchema,
    status: z.number().default(200),
});

export type PaginatedUsersResponseDTO = z.infer<typeof PaginatedUsersResponseSchema>;
