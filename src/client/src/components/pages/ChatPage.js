import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, signOut } from '../../AC';

import Layout from '../common/Layout';

import Messages from '../chat/Messages';
import SendForm from '../chat/SendForm';
import UserList from '../chat/UserList';

import {
  authSelector,
  messageListSelector,
  userListSelector,
} from '../../selector';

class ChatPage extends Component {
  static propTypes = {};

  render() {
    const { users, messages, signOut, username } = this.props;

    return (
      <Layout signOut={this.props.signOut}>
        <div className="container main-content">
          <div className="row">
            <div className="col-md-4 order-md-1 mb-4">
              <UserList users={users} />
            </div>
            <div className="col-md-8 order-md-2 d-none d-md-block bg-light sidebar">
              <Messages messages={this.props.messages} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <SendForm
              sendMessage={this.props.sendMessage}
              username={username}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  username: authSelector(state),
  users: userListSelector(state),
  messages: messageListSelector(state),
});

export default connect(mapStateToProps, { signOut, sendMessage })(ChatPage);
