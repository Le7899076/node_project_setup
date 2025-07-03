
document.addEventListener("DOMContentLoaded", () => {
  const socket = io('http://localhost:3001?key=socket_001&userId=1&userRole=user'); // Adjust to your server URL
  const messages = document.getElementById('messages');
  const input = document.getElementById('msg');
  const sendButton = document.getElementById('sendButton');

  // Handle incoming messages
  socket.on('message', function (data) {
    console.log(data);
    const li = document.createElement('li');
    li.className = 'message p-3 rounded-lg received mr-auto';
    li.textContent = data.message;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
  });

  // Handle sending messages
  function sendMessage() {
    const msg = input.value.trim();
    if (msg) {
      // Emit message to server
      socket.emit('message', {
        message: msg,
      });
      // Display sent message locally
      const li = document.createElement('li');
      li.className = 'message p-3 rounded-lg sent ml-auto';
      li.textContent = msg;
      messages.appendChild(li);
      messages.scrollTop = messages.scrollHeight;
      input.value = '';
    }
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
