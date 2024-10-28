import { z } from "zod";

// Cria um esquema de validação para o título da unidade de saúde
const healthUnitTitleDTO = z
    .string({
        invalid_type_error: "healthUnit.title.invalidType", // Mensagem se o tipo não for string
    })
    .trim() // Remove espaços em branco no início e no fim
    .min(1, {
        message: "healthUnit.title.required", // Mensagem se o título for vazio
    });

export default healthUnitTitleDTO;
