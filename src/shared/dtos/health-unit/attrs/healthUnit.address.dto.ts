import { z } from "zod";

const healthUnitAddressDTO = z.string({
    invalid_type_error: "healthUnit.address.invalidType",
});

export default healthUnitAddressDTO;
