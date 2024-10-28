import Decimal from "decimal.js"; // Certifique-se de que a biblioteca decimal.js está instalada
import { z } from "zod";

const healthUnitLongitudeDTO = z
    .number({
        invalid_type_error: "healthUnit.longitude.invalidType", // Erro para tipo inválido
    })
    .min(-180, {
        message: "healthUnit.longitude.tooLow", // Mensagem de erro para valores muito baixos
    })
    .max(180, {
        message: "healthUnit.longitude.tooHigh", // Mensagem de erro para valores muito altos
    })
    .transform(value => new Decimal(value)); // Converte para Decimal após a validação

export default healthUnitLongitudeDTO;
