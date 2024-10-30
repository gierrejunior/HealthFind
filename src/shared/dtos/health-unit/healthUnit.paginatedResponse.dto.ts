// healthunit.paginatedResponse.dto.ts
import { z } from "zod";
import { HealthUnitSchema } from "./healthUnit.dto"

export const PaginationMetadataSchema = z.object({
    type: z.literal("paginated"),
    currentPage: z.number(),
    next: z.number().nullable(),
    prev: z.number().nullable(),
    lastPage: z.number(),
    perPage: z.number(),
    total: z.number(),
});

export const PaginatedHealthUnitsResponseSchema = z.object({
    data: z.array(HealthUnitSchema),
    message: z.string().default("healthunits.list.success"),
    meta: PaginationMetadataSchema,
    status: z.number().default(200),
});

export type PaginatedHealthUnitsResponseDTO = z.infer<typeof PaginatedHealthUnitsResponseSchema>;
