window.addEventListener('load', ()=>{
    const form = document.getElementById( "myForm" );

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        postMessage();
        let updatedMessages = getMessages();
        alert(updatedMessages);
    });

    function postMessage(){
        const XHR = new XMLHttpRequest;
        const formdt = new FormData(form);

        XHR.open("POST","http://localhost:8080/guestbook");
        XHR.send(formdt);

        XHR.addEventListener("load",function(event) {
            alert("Meddelande skickat!")
        });
        XHR.addEventListener("error",function(event) {
            alert("Ett fel har uppstått!")
        });
    }

    async function getMessages(){
        let endpointURL = "http://localhost:8080/guestbook";

        try {
            let resp = await fetch(endpointURL);
            let messages;

            if (resp.ok){
                messages = await resp.json();
                console.log(messages);
                return messages;
            }
        } catch (error) {
            alert(error);
        }
    }

})