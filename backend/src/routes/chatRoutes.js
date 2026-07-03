import express from "express";
import { getChatResponse } from "../controllers/chatController.js";

const chatRoutes = express.Router();

chatRoutes.post("/", getChatResponse);

export default chatRoutes;
