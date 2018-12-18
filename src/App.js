import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './layout/home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
