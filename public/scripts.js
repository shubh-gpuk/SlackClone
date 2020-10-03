const socket = io("http://localhost:9999");
// const socket2 = io("http://localhost:9999/netflix");
// const socket3 = io("http://localhost:9999/castlevania");
// const socket4 = io("http://localhost:9999/coding");

socket.on('nsDataFromServer', (nsData) => {
    //update namespaces section in DOM
    nsData.forEach((ns) => {
        $(".namespaces").append(`<div class="namespace" ns=${ns.endpoint}><img src=${ns.img}></div>`)
    });

    Array.from($(".namespace")).forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const nsEndpoint = elem.getAttribute('ns');
            console.log(`Goto ${nsEndpoint}`);
        })
    });

})

$("#message-form").on('submit', (event) => {
    event.preventDefault();
    console.log("Form Submitted!");
    const message = document.querySelector("#user-message").value;
    socket.emit("userMessage", {message});
})


