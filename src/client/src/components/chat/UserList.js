import React, { Component } from 'react';

class UserList extends Component {
  render() {
    const { users } = this.props;

    return (
      <div className="message-block">
        {users && Object.keys(users).length > 0 ? (
          this.getUsers()
        ) : (
          <h3>No online</h3>
        )}
      </div>
    );
  }

  getUsers = () => {
    const { users } = this.props;

    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          Users Online : {Object.keys(users).length}
        </h4>
        <div className="nav flex-column mb-2">
          {Object.keys(users).map(userId => (
            <p
              className="media-body pb-1 mb-0 small lh-125 border-bottom border-gray"
              key={userId}
            >
              <strong className="d-block text-gray-dark">
                {users[userId]['username']}
              </strong>
            </p>
          ))}
        </div>
      </div>
    );
  };
}

export default UserList;
