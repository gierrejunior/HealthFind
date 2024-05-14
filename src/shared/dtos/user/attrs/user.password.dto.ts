import { z } from "zod";

const userPasswordDTO = z
    .string({
        invalid_type_error: "user.password.invalidType",
    })
    .min(8, {
        message: "user.password.tooShort",
    })
    .max(32, {
        message: "user.password.tooLong",
    });

export default userPasswordDTO;
