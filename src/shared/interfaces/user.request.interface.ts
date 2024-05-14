import { FastifyRequest } from "fastify";

import { AuthUserDTO } from "../dtos/user/user.dto";

export interface UserRequest extends FastifyRequest {
    userId: AuthUserDTO["id"];
}
