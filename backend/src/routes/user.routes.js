const express = require("express");
const {
	registerController,
	loginController,
	authController,
	logoutController,
} = require("../controllers/user.controller");
const protectRoute = require("../middlewares/auth.middleware");
const asyncWrap = require("../utils/asyncWrap.utils");
const validateRequest = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/user.validator");

const router = express.Router();

router.post(
	"/register",
	validateRequest(registerSchema),
	asyncWrap(registerController),
);
router.post("/login", validateRequest(loginSchema), asyncWrap(loginController));
router.post("/logout", logoutController);
router.get("/auth/me", protectRoute, authController);

module.exports = router;
