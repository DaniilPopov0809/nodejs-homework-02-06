const express = require("express");
const { ctrlContacts } = require("../../controllers");
const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrlContacts.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrlContacts.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlContacts.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlContacts.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateStatusContact
);

module.exports = router;
