import { z } from "zod";

const userUsernameDTO = z.string({
    invalid_type_error: "user.username.invalidType",
});

export default userUsernameDTO;
