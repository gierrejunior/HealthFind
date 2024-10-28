import { z } from "zod";

const healthUnitDescriptionDTO = z
    .string({
        invalid_type_error: "healthUnit.description.invalidType",
    })
    .max(500, {
        message: "healthUnit.description.tooLong", // Mensagem de erro se a descrição for muito longa
    });

export default healthUnitDescriptionDTO;
