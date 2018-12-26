import React, { Component } from 'react';
import './navbar-app.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/bookshelf.png';
import { connect } from 'react-redux';

class NavbarApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      feed: 'app-navbar-active',
      publish: '',
      profile: ''
    }
  }

  handleClick(e){
    this.setState({feed: '', publish: '', profile: '', [e.target.name]: 'app-navbar-active'})
  }

  render() {
    return (
      <div className="app-navbar" >
        <div ><img src={Logo} height="32px" /><NavLink to="/app/dashboard" >Book exchanger</NavLink></div>
        <div></div>
        <div className="app-navbar-menu" >
          <NavLink name="feed" onClick={(e) => this.handleClick(e)} className={this.state.feed} to="/app/feed" >New</NavLink>
          <NavLink name="publish" onClick={(e) => this.handleClick(e)} className={this.state.publish} to="/app/publish" >Publish</NavLink>
          <NavLink name="profile" onClick={(e) => this.handleClick(e)} className={this.state.profile} to="/app/profile" >{this.props.currentUsername}</NavLink>
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