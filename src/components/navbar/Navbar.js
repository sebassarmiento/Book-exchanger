import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../../img/library.png';

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount(){
    window.onscroll = this.handleScroll.bind(this)
  }
  handleScroll(){
    console.log(window.scrollY)
    if(window.scrollY > 400){
      this.setState({scrolled: true})
    } else {
      this.setState({scrolled: false})
    }
  }
  render() {
    return (
      <div className={this.state.scrolled ? "navbar scrolled" : "navbar"} >
        <h3><img src={Logo} height="32px" />Book exchanger</h3>
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