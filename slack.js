const express = require("express");
const http = require("http")
const socketio = require("socket.io");

const namespaces = require('./data/namespaces.js');

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

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(`Client : ${socket.id} connected to ${namespace.endpoint} namespace`);
    })
})

httpServer.listen(9999);

