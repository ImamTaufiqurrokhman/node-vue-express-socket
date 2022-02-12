const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});


httpServer.listen(4000);
io.on("connection", (socket) => {
  console.log("A new user is connected with id " + socket.id)
  socket.on("disconnect", async function() {
    console.log("User with id " + socket.id + " is disconnected")
  });
  socket.on("new_data_from_server", async function(data) {
    console.log(data);
    io.emit("new_data_from_server", data);
  });
});
