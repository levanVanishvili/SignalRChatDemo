
const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

let userName = '';
// Receiving a message from the server
hubConnection.on('Send', function (message, userName) {

    // Create a <b> element for the username
    let userNameElem = document.createElement("b");
    userNameElem.appendChild(document.createTextNode(userName + ': '));

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();

    // Creates a <p> element for the user's message
    let elem = document.createElement("p");
    elem.appendChild(userNameElem);
    elem.appendChild(document.createTextNode(message + ' '));
    elem.appendChild(document.createTextNode(time));

    var firstElem = document.getElementById("chatroom").firstChild;
    document.getElementById("chatroom").insertBefore(elem, firstElem);

    // Clear input message
    let form = document.getElementById("inputForm"),
        input = form.getElementsByTagName("input");

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
});

// Add username
document.getElementById("loginBtn").addEventListener("click", function (e) {
    userName = document.getElementById("userName").value;
    document.getElementById("header").innerHTML = '<h3>Welcome ' + userName + '</h3>';
});
// Sending a message to the server
document.getElementById("sendBtn").addEventListener("click", function (e) {
    let message = document.getElementById("message").value;
    hubConnection.invoke("Send", message, userName);
});


hubConnection.start();