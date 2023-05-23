const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
  phone: Joi.string().required().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
});

module.exports = {
    addShema
}