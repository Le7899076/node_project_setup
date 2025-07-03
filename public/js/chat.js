document.addEventListener("DOMContentLoaded", () => {
  const userId = Math.floor(Math.random() * 1000);
  console.log(userId);
  const socket = io(`http://localhost:3001?key=socket_001&userId=${userId}&userRole=user`);

  socket.on('connect', () => {
    console.log("✅ Connected socket id: " + socket.id);
  });

  const messages = document.getElementById('messages');
  const input = document.getElementById('msg');
  const sendButton = document.getElementById('sendButton');

  socket.on('message', function (data) {
    const li = document.createElement('li');
    li.className = 'message p-3 rounded-lg received mr-auto';
    li.textContent = data.message;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
  });

  function sendMessage() {
    const msg = input.value.trim();
    if (msg) {
      socket.emit('message', { message: msg });

      const li = document.createElement('li');
      li.className = 'message p-3 rounded-lg sent ml-auto';
      li.textContent = msg;
      messages.appendChild(li);
      messages.scrollTop = messages.scrollHeight;
      input.value = '';
    }
  }

  sendButton.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
