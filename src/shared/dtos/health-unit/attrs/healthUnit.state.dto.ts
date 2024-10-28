import { z } from "zod";

// Conjunto de estados válidos
const validStatesSet = new Set([
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", 
    "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]);

// Cria um esquema de validação para o estado da unidade de saúde
const healthUnitStateDTO = z
    .string({
        invalid_type_error: "healthUnit.state.invalidType", // Mensagem se o tipo não for string
    })
    .trim() // Remove espaços em branco no início e no fim
    .refine((state) => validStatesSet.has(state), {
        message: "healthUnit.state.invalidState", // Mensagem se o estado não estiver na lista válida
    });

export default healthUnitStateDTO;
