import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Landing from './components/Landing';
import Footer from './components/Footer';
import './App.css';

//check for token to keep logged in on page change or reload
const jwtToken = localStorage.jwtToken;
if(jwtToken){
  //set auth token header auth
  setAuthToken(jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(jwtToken);
  //set user and is authenticated - call any action within the store (actions and reducers are linked)
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      //wrap the components which will use the store inside provider for later on state handling
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
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
