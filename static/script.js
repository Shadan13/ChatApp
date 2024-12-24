const socket = io(); // Initialize SocketIO client

const messagesDiv = document.getElementById("messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");

// Function to handle message sending
function sendMessage() {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        socket.emit("send_message", { username, message });
        messageInput.value = ""; // Clear the input
    }
}

// Handle click event on the "Send" button
sendBtn.addEventListener("click", sendMessage);

// Handle Enter key press in the input fields
[usernameInput, messageInput].forEach(input => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            // If the Enter key is pressed, try to send the message
            sendMessage();
        }
    });
});

// Listen for incoming messages
socket.on("receive_message", (data) => {
    const newMessage = document.createElement("div");
    newMessage.textContent = `${data.username}: ${data.message}`;
    messagesDiv.appendChild(newMessage);
});
