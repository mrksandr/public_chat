import React, { Component } from 'react';

class SendForm extends Component {
  state = {
    text: '',
    errors: {},
  };

  render() {
    const { messages } = this.props;

    return (
      <form className="card p-2 row m-10" onSubmit={this.handleSend}>
        <div className="input-group">
          <input
            type="text"
            name="text"
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
        <span>{this.state.errors.text}</span>
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

export default SendForm;
