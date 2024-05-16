import { z } from "zod";

const healthUnitManagerDTO = z.string({
    invalid_type_error: "healthUnit.manager.invalidType",
});

export default healthUnitManagerDTO;
