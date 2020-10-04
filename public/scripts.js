const socket = io("http://localhost:9999");
// const socket2 = io("http://localhost:9999/netflix");
// const socket3 = io("http://localhost:9999/castlevania");
// const socket4 = io("http://localhost:9999/coding");

socket.on('nsDataFromServer', (nsData) => {
    //update namespaces section in DOM
    $(".namespaces").html("");      //Clear the previous data in section
    nsData.forEach((ns) => {
        $(".namespaces").append(`<div class="namespace" ns=${ns.endpoint}><img src=${ns.img}></div>`)
    });

    Array.from($(".namespace")).forEach((elem) => {
        elem.addEventListener('click', (event) => {
            const nsEndpoint = elem.getAttribute('ns');
            console.log(`Goto ${nsEndpoint}`);
        })
    });

    nsSocket = io("http://localhost:9999/netflix");
    nsSocket.on('nsRooms', (rooms) => {
        console.log(rooms);
        
        //Update Rooms section in DOM
        $(".room-list").html("");      //Clear the previous data in section
        rooms.forEach((room) => {
            $(".room-list").append(`<li class="room"><span class="glyphicon glyphicon-heart"></span>${room.roomTitle}</li>`);
        });

        Array.from($(".room")).forEach((elem) => {
            elem.addEventListener('click', (event) => {
                console.dir('Clicked on ' + event.target.innerText);
            });
        });
    })

})

$("#message-form").on('submit', (event) => {
    event.preventDefault();
    console.log("Form Submitted!");
    const message = document.querySelector("#user-message").value;
    socket.emit("userMessage", {message});
})


