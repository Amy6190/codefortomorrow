const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("joinRoom", "room1");

  socket.emit("message", { room: "room1", message: "Hello from client!" });

  socket.on("message", (msg) => {
    console.log("New message received:", msg);
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
