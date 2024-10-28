import { z } from "zod";

const healthUnitPhoneDTO = z.string({
    invalid_type_error: "healthUnit.phone.invalidType", // Erro para tipo inválido
}).refine(phone => {
    // Validação: deve conter entre 10 a 15 dígitos
    return /^\d{10,15}$/.test(phone);
}, {
    message: "healthUnit.phone.invalidFormat", // Mensagem de erro para formato inválido
});

export default healthUnitPhoneDTO;
