import { z } from "zod";

const healthUnitImgPathDTO = z.string({
    invalid_type_error: "healthUnit.imgPath.invalidType", // Erro para tipo inválido
}).max(255, {
    message: "healthUnit.imgPath.tooLong", // Mensagem de erro para caminhos muito longos
});

export default healthUnitImgPathDTO;
