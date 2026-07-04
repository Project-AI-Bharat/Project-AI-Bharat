import express from "express";
import * as authcontroller from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const authrouter = express.Router();

authrouter.post("/register", authcontroller.register);
authrouter.post("/login", authcontroller.login);
authrouter.post("/logout", authcontroller.logout);
authrouter.post("/logoutall", requireAuth, authcontroller.logoutAll);
authrouter.post("/verify-email", authcontroller.verifyEmail);
authrouter.get("/me", requireAuth, authcontroller.getMe);
authrouter.post("/refresh", authcontroller.refreshToken);

export default authrouter;
