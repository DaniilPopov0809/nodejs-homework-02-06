const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const schemas = require("../../schemas/contacts");
// const { validateBody } = require("../../middlewares");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addShema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(schemas.addShema), ctrl.updateContact);

module.exports = router;
