import React, { Component } from 'react';
import './navbar-app.css';
import { NavLink } from 'react-router-dom';

class NavbarApp extends Component {
  render() {
    return (
      <div className="app-navbar" >
        <NavLink to="/app/dashboard" >Book exchanger</NavLink>
        <div></div>
        <div>
            <NavLink to="/app/dashboard" >New</NavLink>
            <NavLink to="/app/search" >Search</NavLink>
            <NavLink to="/app/publish" >Publish</NavLink>
            <NavLink to="/app/profile" >SebasSar22</NavLink>
        </div>
      </div>
    )
  }
}

export default NavbarApp;