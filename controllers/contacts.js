const {Contact} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils");

const listContacts = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete succsess" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
