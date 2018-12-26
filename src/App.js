import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './layout/home/Home';
import Footer from './components/footer/Footer';
import Signup from './layout/signup/Signup';
import { connect } from 'react-redux';
import Feed from './layout/app/feed/Feed';
import Login from './layout/login/Login';
import NavbarApp from './components/navbarApp/NavbarApp';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {this.props.logged ? <NavbarApp /> : <Navbar />}
            {!this.props.logged ?
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            </Switch>
            :
            <Switch>
            <Route path="/app/feed" component={Feed} />
            </Switch>
            }
            {this.props.footer ? <Footer /> : null}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    footer: store.footer,
    logged: store.logged
  }
}

export default connect(mapStateToProps)(App);
