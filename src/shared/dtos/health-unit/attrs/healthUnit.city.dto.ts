import { z } from "zod";

const healthUnitCityDTO = z.string({
    invalid_type_error: "healthUnit.city.invalidType",
});

export default healthUnitCityDTO;
