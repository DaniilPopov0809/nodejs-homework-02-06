const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  if (favorite) {
    res.json(data.filter(el => el.favorite === true));
    next();
  }
  res.json(data);
};

module.exports = listContacts;