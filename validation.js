//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        no_telp: Joi.string().required(),
    });
    return Joi.object(data, schema)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });
    return Joi.object(data, schema)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
