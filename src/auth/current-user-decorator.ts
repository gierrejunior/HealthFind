import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { TokenDTO } from "src/shared/dtos/auth/token.dto";

export const CurrentUser = createParamDecorator((_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as TokenDTO;
});
