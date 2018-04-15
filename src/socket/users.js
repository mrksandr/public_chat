import moment from 'moment';

export default class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, username) {
    var user = { id, username };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserList() {
    return this.users;
  }
}

export const generateMessage = message => {
  return {
    id: message.id || moment().valueOf(),
    username: message.username,
    text: message.text,
    createdAt: message.createdAt || moment().toISOString(),
  };
};
