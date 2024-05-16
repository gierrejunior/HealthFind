import { z } from "zod";

const healthUnitDescriptionDTO = z.string({
    invalid_type_error: "healthUnit.description.invalidType",
});

export default healthUnitDescriptionDTO;
