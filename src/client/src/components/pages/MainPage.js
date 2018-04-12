import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInForm from '../SignInForm';
import SignOutForm from '../SignOutForm';
import { signIn, signOut } from '../../AC';
import { authSelector } from '../../selector';

class MainPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col col-xl-6">
              <div className="inner-form">
                {this.props.username ? (
                  <SignOutForm
                    handleSignOut={this.handleSignOut}
                    username={this.props.username}
                  />
                ) : (
                  <SignInForm
                    handleSignIn={this.handleSignIn}
                    username={this.props.username}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSignIn = username => this.props.signIn(username);
  handleSignOut = () => this.props.signOut();
}

export default connect(state => ({ username: authSelector(state) }), {
  signIn,
  signOut,
})(MainPage);
