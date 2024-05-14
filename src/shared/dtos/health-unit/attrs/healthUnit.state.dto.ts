import { z } from "zod";

const validStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
];

const healthUnitStateDTO = z
    .string({
        invalid_type_error: "healthUnit.state.invalidType",
    })
    .refine((state) => validStates.includes(state), {
        message: "healthUnit.state.invalidState",
    });

export default healthUnitStateDTO;
