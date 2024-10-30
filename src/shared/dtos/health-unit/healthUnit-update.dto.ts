import Decimal from "decimal.js";
import { z } from "zod";

export const HealthUnitUpdateSchema = z.object({
    unitType: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    cnes: z.string().nullable(),
    address: z.string().nullable(),
    cep: z.string().nullable(),
    phone: z.string().nullable(),
    city: z.string(),
    state: z.string(),
    manager: z.string().nullable(),
    email: z.string().email().nullable(),
    latitude: z.union([z.number(), z.instanceof(Decimal)]), // Aceita number ou Decimal
    longitude: z.union([z.number(), z.instanceof(Decimal)]), // Aceita number ou Decimal
    imgPath: z.string().nullable(),
});

export type HealthUnitUpdateDTO = z.infer<typeof HealthUnitUpdateSchema>;
