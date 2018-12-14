import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import {Container} from 'reactstrap';

import './App.css';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      //wrap the components which will use the store inside provider for later on state handling
      <Provider store={store}>
        <div className="App">
          <AppNavbar />

          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>

        </div>
       </Provider>
    );
  }
}

export default App;
