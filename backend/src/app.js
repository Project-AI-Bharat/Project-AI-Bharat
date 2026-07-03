import express from "express";
import cors from "cors";
import morgan from "morgan";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/chat", chatRoutes);

export default app;