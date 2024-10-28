import { z } from "zod";

const healthUnitCityDTO = z
    .string({
        invalid_type_error: "healthUnit.city.invalidType",
    })
    .min(2, {
        message: "healthUnit.city.tooShort", // Mensagem de erro se a cidade for muito curta
    })
    .max(100, {
        message: "healthUnit.city.tooLong", // Mensagem de erro se a cidade for muito longa
    })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
        message: "healthUnit.city.invalidCharacters", // Mensagem de erro se a cidade contiver caracteres inválidos
    });

export default healthUnitCityDTO;
