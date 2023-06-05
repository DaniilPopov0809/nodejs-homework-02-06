const { HttpError } = require("../../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
