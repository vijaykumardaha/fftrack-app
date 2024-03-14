const Joi = require('joi');

const login = Joi.object({
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().lowercase().required(),
});

const forget = Joi.object({
    username: Joi.string().email().lowercase().required(),
});

const reset = Joi.object({
    token: Joi.string().lowercase().required(),
    password: Joi.string().lowercase().required(),
});

module.exports = {
    login,
    forget,
    reset
}
