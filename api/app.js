import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import ChatsController from "./Controller/ChatsController.js";
import MessageController from "./Controller/MessageController.js";
import UserController from "./Controller/UserController.js";
import PostController from "./Controller/PostController.js";
import StoriesController from "./Controller/StoriesController.js";
import initChatSocket from "./Controller/ChatSocket.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import session from "express-session";
import passport, { setupPassport } from "./config/passport.js";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 5000;

connectDB();
setupPassport();

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(
  session({
    secret: process.env.JWT_ACCESS_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/chats", ChatsController);
app.use("/messages", MessageController);
app.use("/user", UserController);
app.use("/post", PostController);
app.use("/stories", StoriesController);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const httpServer = createServer(app); // Crea un server HTTP utilizzando la funzione createServer

const io = new Server(httpServer, {
  // Crea un'istanza del server Socket.IO utilizzando il server HTTP creato
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

initChatSocket(io);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
