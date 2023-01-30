import express from "express";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    console.log("path.resolve():", path.resolve());
    res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
