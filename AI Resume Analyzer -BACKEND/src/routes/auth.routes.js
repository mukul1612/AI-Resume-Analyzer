const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRoute = express.Router();
/**
 * @route POST api/auth/register
 * @desc Register  new user
 * @access Public
 */

authRoute.post("/register", authController.registerUserController);
authRoute.post("/login", authController.loginUserController);
authRoute.get("/logout", authController.logoutUserController);
authRoute.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

module.exports = authRoute;
