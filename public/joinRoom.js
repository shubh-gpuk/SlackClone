function joinRoom(roomName){

    nsSocket.emit('joinRoomEvent', roomName, (numberOfUsers) => {
        $(".curr-room-num-users").html(`${numberOfUsers} <span class="glyphicon glyphicon-user"></span>`);
        console.log(numberOfUsers);
    });

    nsSocket.on('roomMessage', (fullMsg, roomObject) => {
        console.log(roomObject);
        $('#messages').append(fullHTML(fullMsg));
    })

    nsSocket.on('roomHistory', (roomObject) => {
        console.log(roomObject);
        $('#messages').html("");
        roomObject.history.forEach(fullMsg => {
            $('#messages').append(fullHTML(fullMsg));
        });

        //Scroll to bottom on connecting
        const messagesUI = document.querySelector("#messages");
        messagesUI.scrollTo(0, messagesUI.scrollHeight);
    })
} 

//Construct proper HTML to update DOM
function fullHTML(fullMsg){
    return (`<li>
                <div class="user-image">
                    <img src=${fullMsg.avatar} />
                </div>
                <div class="user-message">
                    <div class="user-name-time">${fullMsg.username} <span>${new Date(fullMsg.timestamp).toLocaleString()}</span></div>
                    <div class="message-text">${fullMsg.text}</div>
                </div>
            </li>`);
}