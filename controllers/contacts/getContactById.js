const { Contact } = require("../../models/contacts/contacts");
const { HttpError } = require("../../utils");

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
};

module.exports = getContactById;
