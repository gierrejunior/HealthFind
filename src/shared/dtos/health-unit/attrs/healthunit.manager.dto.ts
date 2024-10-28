import { z } from "zod";

const healthUnitManagerDTO = z.string({
    invalid_type_error: "healthUnit.manager.invalidType",
}).min(1, {
    message: "healthUnit.manager.required", // Mensagem de erro para campo vazio
}).max(100, {
    message: "healthUnit.manager.tooLong", // Limita o tamanho máximo do nome
});

export default healthUnitManagerDTO;
