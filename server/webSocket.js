const ws = require("ws");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const wss = new ws.Server(
  {
    port: PORT,
  },
  () => {
    console.log(`Server is running on port ${PORT}`);
  }
);

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

const broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
