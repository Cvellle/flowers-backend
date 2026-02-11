import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import flowersRouter from "./routes/flowersRouter";

import { Server as SocketIOServer } from "socket.io";
import { registerSocketHandlers } from "./socket";
import http from "http";
import path from "path";

const cors = require("cors");
dotenv.config();
const app: Application = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/flowers", flowersRouter);

// for views
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// websockets
io.on("connection", (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);
  registerSocketHandlers(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
