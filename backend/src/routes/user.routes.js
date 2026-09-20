const express = require("express");
const {
	registerController,
	loginController,
	authController,
} = require("../controllers/user.controller");
const protectRoute = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/auth", protectRoute, authController);


module.exports = router;
