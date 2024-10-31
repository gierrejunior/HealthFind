import { z } from "zod";

const healthUnitCityIdDTO = z.string().uuid();

export default healthUnitCityIdDTO;
