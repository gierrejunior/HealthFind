import { FastifyRequest } from "fastify";

import { AuthUserDTO } from "../dtos/user/user.dto";

/*
 * FieldScanRequest interface.
 * This interface use Authenticated boolean to determine if the type is before authentication or after authentication.
 */
export type Request = FastifyRequest & {
    user: AuthUserDTO;
};
