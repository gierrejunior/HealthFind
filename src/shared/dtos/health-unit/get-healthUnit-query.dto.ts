import { z } from "zod";
import { PaginationSchema } from "../pagination/pagination.dto";

export const GetHealthUnitQuerySchema = PaginationSchema.extend({
    title: z.string().optional(),
    description: z.string().optional(),
});

export type GetHealthUnitQueryDTO = z.infer<typeof GetHealthUnitQuerySchema>;
