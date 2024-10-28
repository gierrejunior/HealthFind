// healthunit.dto.ts
import { z } from "zod";
import healthUnitAddressDTO from "./attrs/healthUnit.address.dto";
import healthUnitCepDTO from "./attrs/healthUnit.cep.dto";
import healthUnitCityDTO from "./attrs/healthUnit.city.dto";
import healthUnitDescriptionDTO from "./attrs/healthUnit.description.dto";
import healthUnitEmailDTO from "./attrs/healthUnit.email.dto";
import healthUnitImgPathDTO from "./attrs/healthUnit.imgPath.dto";
import healthUnitLatitudeDTO from "./attrs/healthUnit.latitude.dto";
import healthUnitPhoneDTO from "./attrs/healthUnit.phone.dto";
import healthUnitStateDTO from "./attrs/healthUnit.state.dto";
import healthUnitTitleDTO from "./attrs/healthUnit.title.dto";
import healthUnitLongitudeDTO from "./attrs/healthunit.longitude.dto";
import healthUnitManagerDTO from "./attrs/healthunit.manager.dto";

export const HealthUnitSchema = z.object({
    id: z.string(), // ID da unidade de saúde
    title: healthUnitTitleDTO,
    description: healthUnitDescriptionDTO.nullable(),
    address: healthUnitAddressDTO.nullable(),
    cep: healthUnitCepDTO.nullable(),
    phone: healthUnitPhoneDTO.nullable(),
    city: healthUnitCityDTO,
    state: healthUnitStateDTO,
    manager: healthUnitManagerDTO.nullable(),
    email: healthUnitEmailDTO.email().nullable(),
    latitude: healthUnitLatitudeDTO,
    longitude: healthUnitLongitudeDTO,
    imgPath: healthUnitImgPathDTO.nullable(),
});

export type HealthUnitDTO = z.infer<typeof HealthUnitSchema>;
