import React, { Component } from 'react';

class Messages extends Component {
  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  render() {
    const { messages } = this.props;

    return (
      <div ref="container" className="sidebar-sticky message-block">
        {messages && Object.keys(messages).length > 0 ? (
          this.getMessages()
        ) : (
          <h3>No messages</h3>
        )}
      </div>
    );
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  getMessages = () => {
    const { messages } = this.props;

    return (
      <ul className="list-group mb-3">
        {Object.keys(messages).map(messageId => (
          <li
            key={messageId}
            className="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div>
              <h6 className="my-0">{messages[messageId]['username']}</h6>
              <small className="text-muted">
                {messages[messageId]['text']}
              </small>
            </div>
            <span className="text-muted">
              {messages[messageId]['createdAt']}
            </span>
          </li>
        ))}
      </ul>
    );
  };
}

export default Messages;
