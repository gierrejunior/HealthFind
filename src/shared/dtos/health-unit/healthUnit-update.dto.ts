import Decimal from "decimal.js";
import { z } from "zod";
import healthUnitCityIdDTO from "./attrs/healthUnit.cityId.dto";

export const HealthUnitUpdateSchema = z.object({
    unitType: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    cnes: z.string().nullable(),
    cityId: healthUnitCityIdDTO,
    address: z.string().nullable(),
    cep: z.string().nullable(),
    phone: z.string().nullable(),
    manager: z.string().nullable(),
    email: z.string().email().nullable(),
    latitude: z.union([z.number(), z.instanceof(Decimal)]), // Aceita number ou Decimal
    longitude: z.union([z.number(), z.instanceof(Decimal)]), // Aceita number ou Decimal
    imgPath: z.string().nullable(),
});

export type HealthUnitUpdateDTO = z.infer<typeof HealthUnitUpdateSchema>;
