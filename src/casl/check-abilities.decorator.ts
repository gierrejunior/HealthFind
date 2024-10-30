// src/casl/check-abilities.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const CHECK_ABILITY = "abilities";
export const CheckAbilities = (...abilities: [string, string][]) =>
    SetMetadata(CHECK_ABILITY, abilities);
