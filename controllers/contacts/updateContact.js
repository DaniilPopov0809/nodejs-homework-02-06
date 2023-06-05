const { Contact } = require("../../models/contacts/contacts");
const { HttpError } = require("../../utils");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
};

module.exports = updateContact;
