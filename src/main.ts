import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

type Message = { msg: string; from: string };
const createMesasge = (msg: string, from: string): Message => ({
    msg,
    from,
});

const event = {
    chatMessage: "chat-message",
    hi: "hi",
};

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

io.on("connection", (socket) => {
    socket.broadcast.emit(event.hi, createMesasge("hi", socket.id));
    socket.on(event.chatMessage, (msg) => {
        io.emit(event.chatMessage, createMesasge(msg, socket.id));
    });
    socket.on("disconnect", () => {
        io.emit(event.chatMessage, createMesasge("bye", socket.id));
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
