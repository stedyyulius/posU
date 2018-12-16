import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import store from './store';
import './App.css';

import Home from './pages/Home/Home';
import Checkout from './pages/Checkout/Checkout'
import AddProducts from './pages/AddProducts/AddProducts';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addProducts" component={AddProducts} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
