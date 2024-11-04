import { ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserDTO } from "src/shared/dtos/user/user.dto";
import { GetUserFromTokenService } from "src/user/services";

/**
 * Guard that checks if a user is authenticated using JSON Web Tokens (JWT).
 * @class
 * @extends AuthGuard
 */
@Injectable()
export class JWTGuard {
    constructor(private readonly getUserFromTokenService: GetUserFromTokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (!token) {
            throw new ForbiddenException("Access denied. Unauthorized user.");
        }

        const user: UserDTO = await this.getUserFromTokenService.execute(token);

        request.user = user;
        return true;
    }
}
