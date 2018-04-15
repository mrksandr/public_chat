import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../AC';
import { authSelector } from '../../selector';

class SendForm extends Component {
  state = {
    text: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    nextProps.errors && this.setState({ errors: nextProps.errors });
  }

  render() {
    return (
      <form className="card p-2 row m-10" onSubmit={this.handleSend}>
        <div className="input-group">
          {this.state.errors.text && (
            <label className="error">{this.state.errors.text}</label>
          )}
          <input
            type="text"
            name="text"
            autoComplete="off"
            className={
              this.state.errors.text ? 'form-control has-error' : 'form-control'
            }
            value={this.state.text}
            onChange={this.onChange}
            placeholder="Message"
          />

          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">
              SENT
            </button>
          </div>
        </div>
      </form>
    );
  }

  onChange = ev => {
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

  handleSend = ev => {
    ev.preventDefault();

    let errors = {};
    if (this.state.text && this.state.text.length > 200)
      errors.text = "Message can't be more than 200 letters";
    if (this.state.text === '') errors.text = "Can't be empty";

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { username } = this.props;
      const { text } = this.state;
      this.props.sendMessage({ username, text });
      this.setState({
        text: '',
        errors: {},
      });
    }
  };
}

const mapStateToProps = state => ({
  username: authSelector(state),
  errors: state.messages.errors,
});

export default connect(mapStateToProps, { sendMessage })(SendForm);
