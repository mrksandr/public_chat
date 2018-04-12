import React from 'react';
import PropTypes from 'prop-types';

const initialState = {
  username: '',
  errors: {},
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = ev => {
    const { name, value } = ev.target;

    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors,
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  onFormSubmit = ev => {
    ev.preventDefault();

    let errors = {};
    const re = /^[0-9a-zA-Z\u0400-\u04FF]+$/i;

    if (this.state.username && !re.test(this.state.username))
      errors.username = 'Your name may consists only letters and numbers';

    if (this.state.username === '') errors.username = 'Enter your name';

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { username } = this.state;

      this.props.handleSignIn(this.state.username);
      this.setState({
        username: '',
        errors: {},
      });
    }
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
                  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="Tour name"
                  onChange={this.onInputChange}
                />
              </div>
              <label>{this.state.errors.username}</label>
            </div>

            <div className="col-lg-12">
              <button type="submit" className="btn btn-default">
                <span>Enter</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;

SignInForm.propTypes = {
  handleSignIn: PropTypes.func,
};
