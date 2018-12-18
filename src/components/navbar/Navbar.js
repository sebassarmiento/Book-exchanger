import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar" >
        <h3>Book exchanger</h3>
        <div></div>
        <div className="navbar-btns" >
          <NavLink to="/signup" className="navbar-signup" >Sign up</NavLink>
          <NavLink to="/login" className="navbar-login" >Log in</NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar;