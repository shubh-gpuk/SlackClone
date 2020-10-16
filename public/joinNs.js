// join namespace and get rooms of that namespace
function joinNs(endpoint){
    //If nsSocket is already existing (i.e. the client is connected to a namespace)
    if(nsSocket != ""){
        //disconnect from namespace
        nsSocket.close();

        //Also remove existing event listener on chat submit button
        $("#user-input").off('submit', chatSubmitListener);
    }

    nsSocket = io(`http://localhost:9999${endpoint}`);
    nsSocket.on('nsRooms', (rooms) => {
        console.log(rooms);
        
        //Update Rooms section in DOM
        $(".room-list").html("");      //Clear the previous data in section
        rooms.forEach((room) => {
            $(".room-list").append(`<li class="room"><span class="glyphicon glyphicon-heart"></span>${room.roomTitle}</li>`);
        });

        Array.from($(".room")).forEach((elem) => {
            elem.addEventListener('click', (event) => {
                console.log('Clicked on ' + event.target.innerText);
            });
        });

        //Join top room -- will be made general later
        const topRoom = document.querySelector(".room");
        joinRoom(topRoom.innerText);
        console.log("room : " + topRoom.innerText);
    });

    $("#user-input").on('submit', chatSubmitListener);
}

function chatSubmitListener(event){
    event.preventDefault();
    console.log("Form Submitted!");
    const message = document.querySelector("#user-message").value;
    nsSocket.emit("newMessageToServer", {"text" : message});
}
