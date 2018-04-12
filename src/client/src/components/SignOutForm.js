import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SignOutForm extends React.Component {
  onFormSubmit = ev => {
    ev.preventDefault();
    this.props.handleSignOut();
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.onFormSubmit}
          className="input-group auth-block justify-content-center"
        >
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <label>Chat app</label>
              <div className="form-group">
                <input
                  disabled
                  className="form-control"
                  type="text"
                  value={this.props.username}
                  placeholder="Tour name"
                />
              </div>
            </div>

            <div className="col-lg-12">
              <button type="submit" className="btn btn-default">
                <span>Logout</span>
              </button>
            </div>

            <Link className="btn btn-link m-t-10" to="/chat">
              Back to chat
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignOutForm;

SignOutForm.propTypes = {
  signOut: PropTypes.func,
  username: PropTypes.string,
};
