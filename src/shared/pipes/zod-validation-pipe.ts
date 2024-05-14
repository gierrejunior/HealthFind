import { PipeTransform } from "@nestjs/common";
import { UnknownKeysParam, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly schema: ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, T>) {}

    transform(value: unknown): T {
        return this.schema.parse(value);
    }
}
