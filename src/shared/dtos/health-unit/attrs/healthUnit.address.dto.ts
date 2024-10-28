import { z } from "zod";

const healthUnitAddressDTO = z
    .string({
        invalid_type_error: "healthUnit.address.invalidType",
    })

    .max(100, {
        message: "healthUnit.address.tooLong", // Mensagem se o endereço for muito longo
    });
export default healthUnitAddressDTO;