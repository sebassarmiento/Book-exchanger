import React, { Component } from 'react';
import './navbar-app.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/bookshelf.png';
import { connect } from 'react-redux';

const Menu = props => {
  return (
    <div className={props.open ? "navbar-menu-open" : "navbar-menu-closed"} >
      <h4>Settings</h4>
      <h4>Configuration</h4>
      <h4 onClick={() => props.logout()} >Log out</h4>
    </div>
  )
}

class NavbarApp extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    console.log('Renders')
    return (
      <div className="app-navbar" >
        <div ><img alt="brand-logo" src={Logo} height="32px" /><NavLink to="/app/feed" >Book exchanger</NavLink></div>
        <div className="navbar-settings" >
          <i onClick={() => this.setState({menu: !this.state.menu})} className="fas fa-cog"></i>
          {this.state.menu ? <Menu open logout={this.props.logout} /> : <Menu />}
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