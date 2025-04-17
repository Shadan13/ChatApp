const socket = io(); // Initialize SocketIO client

const messagesDiv = document.getElementById("messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");

// Load username from localStorage if it exists
if (localStorage.getItem("username")) {
    usernameInput.value = localStorage.getItem("username");
}

// Function to handle message sending
function sendMessage() {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (!username) {
        alert("Please enter a username before sending a message.");
        usernameInput.focus();
        return;
    }

    if (!message) return;

    // Emit message to server
    socket.emit("send_message", { username, message });

    messageInput.value = ""; // Clear message input
}

// Handle click event on the "Send" button
sendBtn.addEventListener("click", sendMessage);

// Handle Enter key press in the input fields
[usernameInput, messageInput].forEach(input => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

// Listen for incoming messages
socket.on("receive_message", (data) => {
    const newMessage = document.createElement("div");
    newMessage.textContent = `${data.username}: ${data.message}`;
    messagesDiv.appendChild(newMessage);

    // Auto-scroll to the latest message
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
