var PORT = process.env.PORT || 500;
var cors = require('cors')
const express = require('express');
const app = express();

app.use(cors());

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./public/"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on("newMsg", (data) => {
    socket.broadcast.emit("newMsg",data);
  });
});

server.listen(PORT, () => {
  console.log('listening on :'+PORT);
});

