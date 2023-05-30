const Joi = require("joi");

const { Schema, model } = require("mongoose");
const handleMongooseError = require("../utils/handleMongooseError");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } }),
  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}) 

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
