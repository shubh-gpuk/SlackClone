const socket = io("http://localhost:9999");
let nsSocket = "";

socket.on('nsDataFromServer', (nsData) => {
    //update namespaces section in DOM
    $(".namespaces").html("");      //Clear the previous data in section
    nsData.forEach((ns) => {
        $(".namespaces").append(`<div class="namespace" ns=${ns.endpoint}><img src=${ns.img}></div>`)
    });

    //Join the namespace when user clicks on it
    Array.from($(".namespace")).forEach((elem) => {
        elem.addEventListener('click', (event) => {
            const nsEndpoint = elem.getAttribute('ns');
            joinNs(nsEndpoint);
        })
    });

});


