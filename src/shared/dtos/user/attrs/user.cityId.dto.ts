import { z } from "zod";

const userCityIdDTO = z.string().uuid().optional();

export default userCityIdDTO;
