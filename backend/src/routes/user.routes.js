const express = require("express");
const {
	registerController,
	loginController,
	authController,
} = require("../controllers/user.controller");
const protectRoute = require("../middlewares/auth.middleware");
const asyncWrap = require("../utils/asyncWrap.utils");

const router = express.Router();

router.post("/register", asyncWrap(registerController));
router.post("/login", asyncWrap(loginController));
router.get("/auth", protectRoute, authController);

module.exports = router;
