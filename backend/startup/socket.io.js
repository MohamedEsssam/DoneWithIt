let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server);
    io.on("connection", (socket) => {
      console.log("client connected");
    });

    return io;
  },
  getIO: () => {
    if (!io) throw new Error("socket.io not initialized");

    return io;
  },
};
