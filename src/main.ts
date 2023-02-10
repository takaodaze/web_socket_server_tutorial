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

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

io.on("connection", (socket) => {
    socket.broadcast.emit("hi", createMesasge("hi", socket.id));
    socket.on("chat message", (msg) => {
        io.emit("chat message", createMesasge(msg, socket.id));
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
