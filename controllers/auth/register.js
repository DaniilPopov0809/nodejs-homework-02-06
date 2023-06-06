const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const { HttpError } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPasword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPasword });

  const response = {
    user: { email: newUser.email, subscription: newUser.subscription },
  };

  res.status(201).json(response);
};

module.exports = register;
