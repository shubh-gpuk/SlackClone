const socket = io("http://localhost:9999");
const socket2 = io("http://localhost:9999/admin");

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageFromClient', {"data" : "Hi from Client"});
});

socket.on('joined', (msg) => {
    console.log(msg);
})

socket2.on('welcome', (msg) => {
    console.log("welcome : " + msg);
})

$("#message-form").on('submit', (event) => {
    event.preventDefault();
    console.log("Form Submitted!");
    const message = document.querySelector("#user-message").value;
    socket.emit("userMessage", {message});
})


