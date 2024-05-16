import { z } from "zod";

const healthUnitTitleDTO = z.string({
    invalid_type_error: "healthUnit.title.invalidType",
});

export default healthUnitTitleDTO;
