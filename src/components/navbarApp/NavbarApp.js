import React, { Component } from 'react';
import './navbar-app.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/bookshelf.png';
import { connect } from 'react-redux';

class NavbarApp extends Component {
  render() {
    return (
      <div className="app-navbar" >
        <div ><img src={Logo} height="32px" /><NavLink to="/app/dashboard" >Book exchanger</NavLink></div>
        <div></div>
        <div className="app-navbar-menu" >
          <NavLink to="/app/dashboard" >New</NavLink>
          <NavLink to="/app/publish" >Publish</NavLink>
          <NavLink to="/app/profile" >{this.props.currentUsername}</NavLink>
          <NavLink onClick={() => this.props.logout()} to="/login" >Log out</NavLink>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "LOGOUT" })
  }
}

const mapStateToProps = store => {
  return {
    currentUsername: store.userData.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarApp);