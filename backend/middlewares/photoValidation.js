const {body} = require("express-validator")


const photoinsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({min:3})
            .withMessage("O título precisa ter no minimo 3 caracteres"),

        body("image")
            .custom((value, {req}) => {
                if(!req.file) {
                    throw new Error("A imagem é obrigatória")
                }
                return true;
            }),
    ]
}
 
module.exports = {
    photoinsertValidation
}