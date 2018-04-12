import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSelector } from '../../selector';

class ProtectedRoute extends Component {
  static propTypes = {};

  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.getComponent} />;
  }

  getComponent = (...args) => {
    return this.props.isAuthorized ? (
      <this.props.component {...args} />
    ) : (
      <div>
        <h1>Unauthorized</h1>
        <Link className="btn btn-link m-t-10" to="/">
          To main Page
        </Link>
      </div>
    );
  };
}

export default connect(
  state => ({
    isAuthorized: authSelector(state),
  }),
  null,
  null,
  { pure: false },
)(ProtectedRoute);
