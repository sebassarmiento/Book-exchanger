import React, { Component } from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="footer" >
        <div className="footer-first-row" >
            <NavLink to='/' >About</NavLink>
            <NavLink to='/' >Sign up</NavLink>
            <NavLink to='/' >Log in</NavLink>
            <NavLink to='/' >FAQ</NavLink>
            <NavLink to='/' >Donate</NavLink>
            <NavLink to='/' >Contact us</NavLink>
        </div>
        <p>Book exchange 2019 ©. Developed by Sebastian Sarmiento.</p>
      </div>
    )
  }
}

export default Footer;