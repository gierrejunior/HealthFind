import { z } from "zod";

const userEmailDTO = z
    .string({
        invalid_type_error: "user.email.invalidType",
    })
    .email({
        message: "user.email.invalidEmail",
    });

export default userEmailDTO;
