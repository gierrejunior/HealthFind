/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { BaseResponse } from "../interfaces/response.interface";

export class ResponseStatusInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((response: BaseResponse<unknown>) => {
                context.switchToHttp().getResponse().status(response.status);
                return response;
            }),
        );
    }
}
