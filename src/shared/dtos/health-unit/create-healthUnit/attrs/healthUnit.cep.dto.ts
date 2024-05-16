import { z } from "zod";

const healthUnitCepDTO = z.string({
    invalid_type_error: "healthUnit.cep.invalidType",
});

export default healthUnitCepDTO;
