import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let userIdx = 1;

type Message = { msg: string; from: string };
const createMesasge = (msg: string, from: string): Message => ({
    msg,
    from,
});

const event = {
    chatMessage: "chat-message",
    whoami: "whoami",
    hi: "hi",
    typingStart: "typing-start",
    typingEnd: "typing-end",
    someoneTypingStart: "someone-typing-start",
    someoneTypingEnd: "someone-typing-end",
};

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

app.get("/style", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "style.css"));
});

io.on("connection", (socket) => {
    const username = `user_${userIdx++}`;

    io.emit(event.hi, createMesasge("hi", username));
    socket.emit(event.whoami, username);

    socket.on(event.chatMessage, (msg) => {
        io.emit(event.chatMessage, createMesasge(msg, username));
    });

    socket.on(event.typingStart, (username) => {
        socket.broadcast.emit(event.someoneTypingStart, username);
    });
    socket.on("disconnect", () => {
        io.emit(event.chatMessage, createMesasge("bye", username));
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
