import { z } from "zod";

const healthUnitEmailDTO = z
    .string({
        invalid_type_error: "healthUnit.email.invalidType",
    })
    .email({
        message: "healthUnit.email.invalidEmail",
    });

export default healthUnitEmailDTO;
