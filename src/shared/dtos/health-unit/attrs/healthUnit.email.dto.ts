import { z } from "zod";

const healthUnitEmailDTO = z
    .string({
        invalid_type_error: "healthUnit.email.invalidType",
    })
    .max(255, {
        message: "healthUnit.email.tooLong", // Mensagem de erro se o e-mail for muito longo
    })
    .email({
        message: "healthUnit.email.invalidEmail",
    });

export default healthUnitEmailDTO;
