import Decimal from "decimal.js";
import { string, z } from "zod";
import healthUnitCityIdDTO from "./attrs/healthUnit.cityId.dto";

export const HealthUnitSchema = z.object({
    id: z.string(),
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

export type HealthUnitDTO = z.infer<typeof HealthUnitSchema>;
