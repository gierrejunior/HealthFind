import { z } from "zod";

const healthUnitImgPathDTO = z.string({
    invalid_type_error: "healthUnit.imgPath.invalidType",
});

export default healthUnitImgPathDTO;
