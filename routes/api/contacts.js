const express = require("express");
const {ctrlContacts} = require("../../controllers");
const router = express.Router();
const { schemas } = require("../../models/contacts/contacts");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrlContacts.listContacts);

router.get("/:contactId", isValidId, ctrlContacts.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrlContacts.addContact);

router.delete("/:contactId", isValidId, ctrlContacts.removeContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrlContacts.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateStatusContact
);

module.exports = router;
