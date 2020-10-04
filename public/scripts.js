const socket = io("http://localhost:9999");

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
    
    joinNs('/netflix');
});


