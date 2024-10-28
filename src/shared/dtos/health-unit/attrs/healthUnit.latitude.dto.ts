import Decimal from "decimal.js"; // Certifique-se de que a biblioteca decimal.js está instalada
import { z } from "zod";

const healthUnitLatitudeDTO = z
    .number({
        invalid_type_error: "healthUnit.latitude.invalidType", // Erro para tipo inválido
    })
    .min(-90, {
        message: "healthUnit.latitude.tooLow", // Mensagem de erro para valores muito baixos
    })
    .max(90, {
        message: "healthUnit.latitude.tooHigh", // Mensagem de erro para valores muito altos
    })
    .transform(value => new Decimal(value)); // Converte para Decimal após a validação

export default healthUnitLatitudeDTO;
