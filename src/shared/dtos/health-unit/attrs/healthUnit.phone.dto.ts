import { z } from "zod";

const healthUnitPhoneDTO = z.string({
    invalid_type_error: "healthUnit.phone.invalidType",
});

export default healthUnitPhoneDTO;
