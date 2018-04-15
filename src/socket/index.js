import moment from 'moment';
import Users, { generateMessage } from './users';

const users = new Users();

export default io => {
  io.on('connection', socket => {
    console.log('[server] connected');

    socket.on('disconnect', () => {
      const user = users.removeUser(socket.id);
      console.log('[server] disconnect socket');
      if (user) {
        console.log(`[server] logout: ${user.username}`);
        socket.broadcast.emit('users.logout', { user }); // admin
      }
    });

    socket.on('login', ({ username }, callback) => {
      if (!username) {
        return callback('Name is required.');
      }
      console.log(`[server] login: `, username);
      users.removeUser(socket.id);

      const user = users.addUser(socket.id, username);

      socket.emit('users.fetch', { users: users.getUserList() });
      socket.broadcast.emit('users.login', { user }); // admin

      callback();
    });

    socket.on('logout', () => {
      const user = users.removeUser(socket.id);
      if (user && user.username) {
        console.log(`[server] logout: ${user.username}`);
        socket.broadcast.emit('users.logout', { user }); // admin
      }
      socket.disconnect();
    });

    let messages = [];
    socket.on('message', payload => {
      console.log(`[server] message: ${payload.text}`);
      const user = users.getUser(socket.id);
      const message = generateMessage(payload);
      io.emit('messages.new', { message }); // admin
    });
  });
};
