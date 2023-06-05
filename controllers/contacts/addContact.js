const { Contact } = require("../../models/contacts/contacts");

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

module.exports = addContact;
