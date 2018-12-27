import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './layout/home/Home';
import Footer from './components/footer/Footer';
import Signup from './layout/signup/Signup';
import { connect } from 'react-redux';
import Login from './layout/login/Login';
import NavbarApp from './components/navbarApp/NavbarApp';
import AppMenu from './layout/app-menu/AppMenu';
import FeedView from './layout/app/feed/FeedView';

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
              <div className="app-layout" >
                <AppMenu />
                <Switch>
                  <Route path="/app/feed" component={FeedView} />
                </Switch>
              </div>
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
