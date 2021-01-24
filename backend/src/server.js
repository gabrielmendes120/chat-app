const app = require("./app");
const userController = require("./controllers/userController");
var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  var userId;

  socket.on("login", async (user) => {
    console.log(`User login ${user.username}`);

    socket.join("chat");
    userId = await userController.saveUserChatOnline(user);

    console.log("User id -> ", userId);
    if (userId != null) {
      const users = await userController.getAllUsersChatOnline();
      io.sockets.in("chat").emit("login", users);
    }
  });

  socket.on("chat message", (user, message) => {
    io.to("chat").emit("chat message", user, message);
  });

  socket.on("disconnect", async () => {
    console.log("Disconnect user id -> ", userId);
    await userController.removeUserChatOnline(Number(userId));
    const users = await userController.getAllUsersChatOnline();
    io.to("chat").emit("login", users);
  });
});

server.listen(app.get("port"), () => {
  console.log("Listening to port: ", app.get("port"));
});
