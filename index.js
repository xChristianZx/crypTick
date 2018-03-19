const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

// Connection to GDAX API
const GDAX_ENDPOINT = "wss://ws-feed.gdax.com";
const wsGDAX = new WebSocket(GDAX_ENDPOINT);
const heartbeat = {
  type: "subscribe",
  product_ids: ["BTC-USD", "ETH-USD", "LTC-USD"],
  channels: ["heartbeat", "ticker"]
};

//Broadcast Function
wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wsGDAX.onopen = () => {
  wsGDAX.send(JSON.stringify(heartbeat));
  console.log("Connecting with GDAX API");
};

wsGDAX.onmessage = msg => {
  wsServer.broadcast(msg.data);
};

wsGDAX.onerror = err => {
  console.log(err.message);
};

wsGDAX.onclose = msg => {
  console.log(msg);
};

// wsServer to Client Connection
wsServer.on("connection", ws => {
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: "message",
        data: "Hello client"
      })
    );
  };
  ws.onmessage = msg => {
    console.log("Client message:", msg.data);
  };
  ws.onerror = err => {
    console.log("Client Error:", err.message);
  };
  ws.onclose = msg => {
    console.log("Client Connection Closed:", msg.code);
  };
});

app.get("/", (req, res) => {
  res.send("WEEEE!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Now serving on ${PORT}`);
});
