const express = require("express");
const { AuthController } = require("../controllers");
const { AuthMiddleware } = require("../middlewares");

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/verify/:verificationCode", AuthController.verifyEmail);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get(
  "/check-auth",
  AuthMiddleware.verifyToken,
  AuthController.checkAuth
);
AuthRouter.get("/logout", AuthMiddleware.verifyToken, AuthController.logout);
AuthRouter.post(
  "/refresh-token",
  AuthMiddleware.verifyToken,
  AuthController.refreshToken
);

module.exports = AuthRouter;
