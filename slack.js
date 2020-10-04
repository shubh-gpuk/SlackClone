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
    //send array to client containing namespaces' img and endpoint
    const nsData = namespaces.map((ns) => {
        return {
            img : ns.img,
            endpoint : ns.endpoint
        }
    });
    //console.log(nsData);
    socket.emit('nsDataFromServer', nsData);
});

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(`Client : ${socket.id} connected to ${namespace.endpoint} namespace`);

        //Send rooms info to the client
        socket.emit('nsRooms', namespace.rooms);
    })
})

httpServer.listen(9999);

