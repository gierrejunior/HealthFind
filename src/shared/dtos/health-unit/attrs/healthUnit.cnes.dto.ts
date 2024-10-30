import { z } from "zod";

// Cria um esquema de validação para o título da unidade de saúde
const healthUnitCnesDTO = z
    .string({
        invalid_type_error: "healthUnit.cnes.invalidType", // Mensagem se o tipo não for string
    })
    .trim() // Remove espaços em branco no início e no fim
    .min(1, {
        message: "healthUnit.cnes.required", // Mensagem se o título for vazio
    });

export default healthUnitCnesDTO;
