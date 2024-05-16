import { ExecutionContext, Injectable } from "@nestjs/common";

import { UserDTO } from "src/shared/dtos/user/user.dto";
import { GetUserFromTokenService } from "src/user/services";

/**
 * Guard that checks if a user is authenticated using JSON Web Tokens (JWT).
 * @class
 * @extends AuthGuard
 */
@Injectable()
export class JWTGuard {
    constructor(private readonly getuserFromTokenService: GetUserFromTokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        if (!token) {
            return false;
        }
        const user: UserDTO = await this.getuserFromTokenService.execute(token);
        if (!user) {
            return false;
        }
        request.user = user;
        return true;
    }
}
