const express = require("express");
const http = require("http")
const socketio = require("socket.io");

const app = express();
app.use(express.static(__dirname + '/public'));

const httpServer = http.createServer(app);
const io = socketio(httpServer);

//io.on == io.of("/").on
io.on('connection', (socket) => {
    console.log("Started root socket connection");
    socket.emit('messageFromServer', {"data" : "Hello from server!"});
    socket.on('messageFromClient', (dataFromClient) => {
        console.log("Client : " + socket.id);
        console.log(dataFromClient);
    })
    socket.join('level1');      //Join a room
    socket.to('level1').emit('joined', `${socket.id} says I joined the room level1`);
});

io.of("/admin").on('connection', (socket) => {
    console.log("Client : " + socket.ID + "connected to /admin namespace");
    io.of("/admin").emit('welcome', "Welcome to the admin namespace");
})

httpServer.listen(9999);

