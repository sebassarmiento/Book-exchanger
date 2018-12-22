import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './layout/home/Home';
import Footer from './components/footer/Footer';
import Signup from './layout/signup/Signup';
import { connect } from 'react-redux';
import Dashboard from './layout/user/dashboard/Dashboard';
import Login from './layout/login/Login';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
            {this.props.footer ? <Footer /> : null}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    footer: store.footer
  }
}

export default connect(mapStateToProps)(App);
