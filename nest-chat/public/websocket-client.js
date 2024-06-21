document.addEventListener('DOMContentLoaded', () => {
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Conectado ao servidor');
  });

  socket.on('previousMessages', (messages) => {
    messages.forEach(({ message, clientId }) => {
      addMessageToDOM(`Cliente ${clientId}: ${message}`);
    });
  });

  socket.on('msgToClient', (message, clientId) => {
    addMessageToDOM(`Cliente ${clientId}: ${message}`);
  });

  document.getElementById('sendButton').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    socket.emit('msgToServer', message);
    messageInput.value = '';
  });

  function addMessageToDOM(message) {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('li');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
  }
});
