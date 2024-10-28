import { z } from "zod";

const healthUnitCepDTO = z
    .string({
        invalid_type_error: "healthUnit.cep.invalidType",
    })
    .regex(/^\d{5}-\d{3}$|^\d{8}$/, {
        message: "healthUnit.cep.mustBeValidFormat",
    }); // Aceita formatos '12345-678' ou '12345678'

export default healthUnitCepDTO;
