// decorators/is-cnpj.decorator.ts
import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions } from "class-validator";
import { CnpjValidationService } from "../services";

@Injectable()
export class IsCNPJConstraint {
    constructor(private readonly cnpjValidationService: CnpjValidationService) {}

    validate(cnpj: string) {
        return this.cnpjValidationService.isValidCNPJ(cnpj);
    }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "isCNPJ",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsCNPJConstraint,
        });
    };
}
