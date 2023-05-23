const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const getContacts = await listContacts();
  const result = getContacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const getContacts = await listContacts();
  const index = getContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = getContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const getContacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  getContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const getContacts = await listContacts();
  const index = getContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  getContacts[index] = { ...getContacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));
  return getContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
