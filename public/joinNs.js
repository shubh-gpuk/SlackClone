// join namespace and get rooms of that namespace
function joinNs(endpoint){
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
    });
}
