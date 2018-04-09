export default io => {
  io.on('connection', socket => {
    console.log('New user connected');

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app'),
    );

    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
  });
};
