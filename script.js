const endpointURL = "http://nihil.roburterra.net/guestbook";

window.addEventListener('load', ()=>{
    const form = document.getElementById( "myForm" );
    
    showNewMessages();

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        postMessage();
        
    });

    function showNewMessages(){
        try {
            getMessages().then(setGuestBookContent);
        } catch (silent) {}
    
    }

    function postMessage(){
        const XHR = new XMLHttpRequest;
        const formdt = new FormData(form);

        XHR.open("POST",endpointURL);
        XHR.send(formdt);

        XHR.addEventListener("load",function(event) {
            alert("Meddelande skickat!")
            showNewMessages();
        });
        XHR.addEventListener("error",function(event) {
            alert("Ett fel har uppstått!")
        });
    }

    async function getMessages(){

        try {
            let resp = await fetch(endpointURL);
            let messages;

            if (resp.ok){
                messages = await resp.json();
                return messages;
            }
        } catch (error) {
            alert(error);
        }
    }

    function setGuestBookContent(messages) {
        let contentDiv = document.getElementById('guestbookContent');

        //clearing DIV-element
        contentDiv.innerHTML = ""

        //rendering new list
        messages.forEach((somePost,index) => {
            let newPElement = document.createElement('p');
            let newLine = `<b>Namn:</b> ${somePost.name} <br /> <b>Meddelande:</b> ${somePost.message} <br /> <b>Skickat:</b> ${somePost.timestamp} <br /> <i>${somePost.response}</i>`
            newPElement.innerHTML = newLine
            contentDiv.appendChild(newPElement)
        });
    }


})