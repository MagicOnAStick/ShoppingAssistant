import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Landing from './components/Landing';
import Footer from './components/Footer';

import {Container} from 'reactstrap';

import './App.css';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      //wrap the components which will use the store inside provider for later on state handling
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/mylist" component={ShoppingList}/>
            </div>
            <Footer />
          </div>
        </Router>
       </Provider>
    );
  }
}

export default App;
