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
import IndividualBook from './layout/app/book/individualBook';
import Profile from './layout/app/profile/Profile';
import PublishBook from './components/publishBook/PublishBook';
import Notification from './components/notification/Notification';

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
                <Route component={Login} />
              </Switch>
              :
              <div className="app-layout" >
                {this.props.appMenu.status !== 'closed' ? <AppMenu /> : null}
                <Switch>
                  <Route path="/app/feed" exact component={FeedView} />
                  <Route path="/app/books/id/:bookId" exact component={IndividualBook} />
                  <Route path="/app/profile" exact component={Profile} />
                  <Route path="/app/user/:userId" component={Profile} />
                </Switch>
                {this.props.publish ? <PublishBook /> : null}
                {this.props.notification ? <Notification {...this.props.notification} /> : null}
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
    logged: store.logged,
    publish: store.publish,
    notification: store.notification,
    appMenu: store.appMenu
  }
}

export default connect(mapStateToProps)(App);
