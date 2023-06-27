const express = require("express");

const router = express.Router();

const { ctrlAuth } = require("../../controllers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlAuth.register
);

router.get("/verify/:verificationToken", ctrlAuth.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  ctrlAuth.resendVerify
);

router.post("/login", validateBody(schemas.loginSchema), ctrlAuth.login);

router.get("/current", authenticate, ctrlAuth.getCurrent);

router.post("/logout", authenticate, ctrlAuth.logout);

router.patch("/", authenticate, ctrlAuth.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlAuth.updateAvatar
);

module.exports = router;
