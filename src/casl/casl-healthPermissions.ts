import { AbilityBuilder, PureAbility } from "@casl/ability";
import { Role, User } from "@prisma/client";

export function defineHealthPermissions(user: User, can: AbilityBuilder<PureAbility>["can"]) {
    if (user.role === Role.ADMIN) {
        // Admin pode gerenciar tudo
        can("manage", "HealthUnit");
        can("manage", "HealthUnitArea");
        can("manage", "HealthTeamArea");
        can("manage", "Nurse");
        can("manage", "Doctor");
        can("manage", "NursingTechnician");
        can("manage", "Dentist");
        can("manage", "HealthAgent");
        can("manage", "MicroArea");
    } else if (user.role === Role.STAFF) {
        // STAFF pode criar, ler, atualizar e deletar qualquer entidade dentro da sua cityId
        can(
            "create",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            { cityId: user.cityId },
        );
        can(
            "read",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            { cityId: user.cityId },
        );
        can(
            "update",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            { cityId: user.cityId },
        );
        can(
            "delete",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            { cityId: user.cityId },
        );
    } else {
        // USER pode criar e ler, mas só pode deletar e atualizar o que ele mesmo criou
        can(
            "create",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            { cityId: user.cityId },
        );
        can(
            "read",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            { cityId: user.cityId },
        );
        can(
            "update",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            {
                cityId: user.cityId,
                createdById: user.id, // Somente os criados por ele
            },
        );
        can(
            "delete",
            [
                "HealthUnit",
                "HealthUnitArea",
                "HealthTeamArea",
                "Nurse",
                "Doctor",
                "NursingTechnician",
                "Dentist",
                "HealthAgent",
                "MicroArea",
            ],
            {
                cityId: user.cityId,
                createdById: user.id, // Somente os criados por ele
            },
        );
    }
}
