import { z } from "zod";

const userLastNameDTO = z.string({
    invalid_type_error: "user.lastName.invalidType",
});

export default userLastNameDTO;
