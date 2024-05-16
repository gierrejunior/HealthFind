import { z } from "zod";

export const PaginationSchema = z.object({
    page: z
        .string()
        .optional()
        .default("1")
        .transform((value) => Number(value))
        .refine((value) => value > 0, {
            message: "pagination.page.tooLow",
            path: ["page"],
        }),
    limit: z
        .string()
        .optional()
        .default("20")
        .transform((value) => Number(value))
        .refine((value) => value <= 50, {
            message: "pagination.limit.tooHigh",
            path: ["limit"],
        }),
});

export type PaginationDTO = z.infer<typeof PaginationSchema>;
