import express from "express";
import { getChatResponse } from "../controllers/chatController.js";
import { requireAuth } from "../middleware/auth.js";

const chatRoutes = express.Router();

chatRoutes.post("/", requireAuth, getChatResponse);

export default chatRoutes;
