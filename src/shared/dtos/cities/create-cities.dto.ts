import { CnpjValidationService } from "src/shared/utils/services";
import { z } from "zod";

// Instancia o serviço de validação de CNPJ (caso esteja registrado como provider em Nest, injete-o diretamente)
const cnpjValidationService = new CnpjValidationService();

export const CreateCitySchema = z.object({
    cnpj: z
        .string()
        .min(1, "CNPJ não pode ser vazio")
        .refine((value) => cnpjValidationService.isValidCNPJ(value), {
            message: "CNPJ inválido",
        }),
    name: z.string().min(1, "Nome não pode ser vazio"),
    state: z.string().min(1, "Estado não pode ser vazio"),
    geojson: z.object({
        type: z.literal("Polygon"),
        coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
    }),
});

export type CreateCityDTO = z.infer<typeof CreateCitySchema>;
