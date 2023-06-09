const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete succsess" });
};

module.exports = removeContact;
