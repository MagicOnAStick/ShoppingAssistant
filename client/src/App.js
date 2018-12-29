import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import Register from './components/auth/register';
import Login from './components/auth/login';

import {Container} from 'reactstrap';

import './App.css';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      //wrap the components which will use the store inside provider for later on state handling
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Route exact path="/" component={ShoppingList}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
            </div>
          </div>
        </Provider>
       </Router>
    );
  }
}

export default App;
