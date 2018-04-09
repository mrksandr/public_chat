'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generateMessage = function generateMessage(from, text) {
  return {
    from: from,
    text: text
    // createdAt: moment().valueOf(),
  };
};

exports.default = function (io) {
  io.on('connection', function (socket) {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', function (params, callback) {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        callback('Name and room name are required.');
      }

      callback();
    });

    socket.on('createMessage', function (message, callback) {
      console.log('createMessage', message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback();
    });

    socket.on('createLocationMessage', function (coords) {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function () {
      console.log('User was disconnected');
    });
  });
};
//# sourceMappingURL=index.js.map