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
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        console.log(`Client : ${nsSocket.id} connected to ${namespace.endpoint} namespace`);

        //Send rooms info to the client
        nsSocket.emit('nsRooms', namespace.rooms);

        //Handle client to join a room
        nsSocket.on('joinRoomEvent', (roomName, numberOfUsersCallback) => {
            nsSocket.join(roomName);

            // //Number of clients connected to the room
            // io.of(namespace.endpoint).in(roomName).clients((error, clients) => {
            //     numberOfUsersCallback(clients.length);
            // });

            //Send message and roomObject (which contains room history) on an event
            const roomObject = namespace.rooms.find((room) => {
                return room.roomTitle === roomName
            })
            io.of(namespace.endpoint).to(roomName).emit('roomHistory', roomObject);

            io.of(namespace.endpoint).in(roomName).clients((error, clients) => {
                const numOfUsers = clients.length;
                io.of(namespace.endpoint).to(roomName).emit('updateRoomHeader', roomName, numOfUsers);
            })
        });

        //Broadcast messages to all members in the room
        nsSocket.on('newMessageToServer', (msg) => {
            const fullMsg = {
                "text" : msg.text,
                "timestamp" : Date.now(),
                "avatar" : "https://via.placeholder.com/30",
                "username" : "rbunch"
            };
            console.log(fullMsg)
            const rooms = Object.keys(nsSocket.rooms);
            const topRoom = rooms[1]

            //Save message in history
            const roomObject = namespace.rooms.find((room) => {
                return room.roomTitle === topRoom
            });
            roomObject.addMessage(fullMsg);
            console.log(roomObject);
            
            //Send message and roomObject (which contains room history) on an event
            io.of(namespace.endpoint).to(topRoom).emit('roomMessage', fullMsg, roomObject);
        });
    });
})

httpServer.listen(9999);

