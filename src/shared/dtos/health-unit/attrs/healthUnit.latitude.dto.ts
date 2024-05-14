import { z } from "zod";

const healthUnitLatitudeDTO = z.number({
    invalid_type_error: "healthUnit.latitude.invalidType",
});

export default healthUnitLatitudeDTO;
