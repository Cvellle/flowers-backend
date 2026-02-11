import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import flowersRouter from "./routes/flowersRouter";
import staticRouter from "./routes/staticRouter";
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
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static("uploads"));
app.use("/flowers", flowersRouter);
app.use("/", staticRouter);
app.use("/api", userRoutes);
// for views
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
//   });
// }

// to test
// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

// Socket.io setup
io.on("connection", (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);
  registerSocketHandlers(socket, io);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
