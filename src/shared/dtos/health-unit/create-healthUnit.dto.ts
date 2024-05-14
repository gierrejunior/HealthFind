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

export const CreateHealthUnitSchema = z.object({
    title: healthUnitTitleDTO,
    description: healthUnitDescriptionDTO.optional(),
    address: healthUnitAddressDTO.optional(),
    cep: healthUnitCepDTO.optional(),
    phone: healthUnitPhoneDTO.optional(),
    city: healthUnitCityDTO,
    state: healthUnitStateDTO,
    manager: healthUnitManagerDTO.optional(),
    email: healthUnitEmailDTO.email().optional(),
    latitude: healthUnitLatitudeDTO,
    longitude: healthUnitLongitudeDTO,
    imgPath: healthUnitImgPathDTO.optional(),
});

export type CreateHealthUnitDTO = z.infer<typeof CreateHealthUnitSchema>;
