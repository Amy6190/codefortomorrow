const { Server } = require("socket.io");

const setupSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });

        socket.on("message", ({ room, message }) => {
            io.to(room).emit("message", message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = setupSocket;
