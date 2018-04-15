import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../AC';

import Layout from '../common/Layout';

import Messages from '../chat/Messages';
import SendForm from '../chat/SendForm';
import UserList from '../chat/UserList';

import { userListSelector } from '../../selector';

class ChatPage extends Component {
  static propTypes = {};

  render() {
    const { users, signOut } = this.props;

    return (
      <Layout signOut={signOut}>
        <div className="container main-content">
          <div className="row">
            <div className="col-md-4 order-md-1 mb-4">
              <UserList users={users} />
            </div>
            <div className="col-md-8 order-md-2 d-none d-md-block bg-light sidebar">
              <Messages />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <SendForm />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  users: userListSelector(state),
});

export default connect(mapStateToProps, { signOut })(ChatPage);
