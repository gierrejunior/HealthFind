import { z } from "zod";

const healthUnitLongitudeDTO = z.number({
    invalid_type_error: "healthUnit.longitude.invalidType",
});

export default healthUnitLongitudeDTO;
