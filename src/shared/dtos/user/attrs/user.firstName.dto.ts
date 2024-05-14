import { z } from "zod";

/**
 * A Zod schema for validating a user's first name.
 */
const userFirstNameDTO = z.string({
    invalid_type_error: "user.firstName.invalidType",
});

export default userFirstNameDTO;
