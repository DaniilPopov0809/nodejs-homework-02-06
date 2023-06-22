const { Schema, model } = require("mongoose");
const handleMongooseError = require("../utils/handleMongooseError");

const Joi = require("joi");

const {
  emailRegexp,
  passRegexp,
  subscriptionData,
} = require("../constants/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      minlength: 6,
      default: null,
    },
    subscription: {
      type: String,
      enum: subscriptionData,
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passRegexp).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  userEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
