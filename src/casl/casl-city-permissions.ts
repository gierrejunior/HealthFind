// casl/casl-city-permissions.ts
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { Role, User } from "@prisma/client";

export function defineCityPermissions(
    user: User,
    can: AbilityBuilder<PureAbility>["can"],
    cannot: AbilityBuilder<PureAbility>["cannot"],
) {
    if (user.role === Role.ADMIN) {
        // Admin pode gerenciar tudo relacionado a City
        can("manage", "City");
    } else {
        // Staff e User não podem realizar nenhuma operação em City
        cannot("manage", "City");
    }
}
