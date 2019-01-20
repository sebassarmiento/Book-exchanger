import React, { Component } from 'react';
import './navbar-app.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/bookshelf.png';
import { connect } from 'react-redux';

const Menu = props => {
  return (
    <div className={`navbar-menu ${props.closing ? 'navbar-menu-closed' : ''}`} >
      <h4>Settings</h4>
      <h4>Configuration</h4>
      <h4 onClick={() => props.logout()} >Log out</h4>
    </div>
  )
}

const MenuToggler = props => {
  return (
    <span onClick={() => props.click()} className={props.class} >
      <span></span>
      <span></span>
      <span></span>
    </span>
  )
}

class NavbarApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      closing: true
    }
  }

  handleOpen(){
    if(!this.state.menuOpened && this.props.appMenu.status === 'closed'){
      this.setState({menuOpened: !this.state.menuOpened})
      this.props.openMenu()
    } 
    if(this.state.menuOpened && this.props.appMenu.status === 'open') {
      this.setState({menuOpened: !this.state.menuOpened})
      this.props.closingMenu()
      setTimeout(() => {
        this.props.closeMenu()
      }, 500)
    }
  }

  handleSettings(){
    this.setState({closing: !this.state.closing})
    if(this.state.menu && !this.state.closing){
      setTimeout(() => {
        this.setState({menu: false})
      }, 500)
    } else if(this.state.closing) {
      this.setState({menu: true})
    }
  }

  render() {
    const menu = this.state.menuOpened ? "menu-open" : "menu-closed"
    return (
      <React.Fragment>
      <div className="app-navbar" >
        <div>
          <MenuToggler click={() => this.handleOpen()} class={menu} />
          <NavLink to="/app/feed" >Book exchanger</NavLink>
        </div>
        <div className="navbar-settings" >
          <i onClick={() => this.handleSettings()} className="fas fa-cog"></i>
        </div>
      </div>
      {this.state.menu ? <Menu closing={this.state.closing} logout={this.props.logout} /> : null }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "LOGOUT" }),
    openMenu: () => dispatch({ type: "APP_MENU_OPEN" }),
    closingMenu: () => dispatch({ type: "APP_MENU_CLOSING" }),
    closeMenu: () => dispatch({ type: "APP_MENU_CLOSE" })
  }
}

const mapStateToProps = store => {
  return {
    currentUsername: store.userData.username,
    appMenu: store.appMenu
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarApp);