import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import '../App.scss';
import ProtectedRoute from './common/ProtectedRoute';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import NotFounPage from './pages/NotFounPage';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <ProtectedRoute path="/chat" component={ChatPage} />
        <Route path="*" component={NotFounPage} />
      </Switch>
    );
  }
}

export default App;
