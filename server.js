"use strict";

const express = require("express");
const socket = require("socket.io");
const helmet = require("helmet");
const compression = require("compression");
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.static("public"));

const server = app.listen(PORT, () => console.log(`Server listening on port, ${PORT}.`));

// Socket Setup
const io = socket(server);

io.on("connection", (socket) => {
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});