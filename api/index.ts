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

// cors
const allowedOrigins = [
  "http://localhost:3001", // Vite default port
  "http://localhost:3000",
  "flower-spot-app.vercel.app", // Your actual Vercel URL
];

app.use(
  cors({
    origin: (origin: any, callback: any) => {
      // 1. Allow internal server-to-server or tools like Postman (no origin)
      if (!origin) return callback(null, true);

      // 2. Check if the domain is in our whitelist
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // 3. Block if not whitelisted
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
// Middleware to parse JSON bodies
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
