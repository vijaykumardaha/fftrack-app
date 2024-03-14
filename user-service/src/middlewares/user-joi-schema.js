const Joi = require('joi');

const register = Joi.object({
    name: Joi.string().lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    mobile: Joi.string().min(10).max(10).required()
});

module.exports = {
    register
}
