import { AbilityBuilder, AbilityClass, FieldMatcher, PureAbility, Subject } from "@casl/ability";
import { prismaQuery } from "@casl/prisma";
import { User } from "@prisma/client";
import { defineHealthPermissions } from "./casl-healthPermissions";
import { defineUserPermissions } from "./casl-user-permissions";

// Define FieldMatcher para verificar se o campo está na lista permitida
const fieldMatcher: FieldMatcher = (fields) => {
    return (field) => fields.includes(field);
};

export type AppAbility = PureAbility<[string, Subject]>;

export function defineAbilitiesFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);

    defineUserPermissions(user, can, cannot);
    defineHealthPermissions(user, can);

    return build({
        detectSubjectType: (item) =>
            item && typeof item === "object" && "constructor" in item
                ? (item as any).constructor
                : null,
        conditionsMatcher: prismaQuery,
        fieldMatcher,
    });
}

export class CaslAbilityFactory {
    createForUser(user: User) {
        return defineAbilitiesFor(user);
    }
}
