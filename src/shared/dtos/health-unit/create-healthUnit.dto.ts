import { z } from "zod";
import healthUnitAddressDTO from "./attrs/healthUnit.address.dto";
import healthUnitCepDTO from "./attrs/healthUnit.cep.dto";
import healthUnitCityIdDTO from "./attrs/healthUnit.cityId.dto";
import healthUnitCnesDTO from "./attrs/healthUnit.cnes.dto";
import healthUnitDescriptionDTO from "./attrs/healthUnit.description.dto";
import healthUnitEmailDTO from "./attrs/healthUnit.email.dto";
import healthUnitImgPathDTO from "./attrs/healthUnit.imgPath.dto";
import healthUnitLatitudeDTO from "./attrs/healthUnit.latitude.dto";
import healthUnitLongitudeDTO from "./attrs/healthunit.longitude.dto";
import healthUnitManagerDTO from "./attrs/healthunit.manager.dto";
import healthUnitPhoneDTO from "./attrs/healthUnit.phone.dto";
import healthUnitTitleDTO from "./attrs/healthUnit.title.dto";
import healthUnitUnitTypeDTO from "./attrs/healthUnit.unitType.dto";

export const CreateHealthUnitSchema = z.object({
    unitType: healthUnitUnitTypeDTO,
    title: healthUnitTitleDTO,
    description: healthUnitDescriptionDTO.optional(),
    cnes: healthUnitCnesDTO.optional(),
    cityId: healthUnitCityIdDTO,
    address: healthUnitAddressDTO.optional(),
    cep: healthUnitCepDTO.optional(),
    phone: healthUnitPhoneDTO.optional(),
    manager: healthUnitManagerDTO.optional(),
    email: healthUnitEmailDTO.email().optional(),
    latitude: healthUnitLatitudeDTO,
    longitude: healthUnitLongitudeDTO,
    imgPath: healthUnitImgPathDTO.optional(),
});

export type CreateHealthUnitDTO = z.infer<typeof CreateHealthUnitSchema>;
