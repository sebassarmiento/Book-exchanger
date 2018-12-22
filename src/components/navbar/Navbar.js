import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../../img/bookshelf.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    window.onscroll = this.handleScroll.bind(this)
  }

  handleScroll() {
    if (window.scrollY > 400) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  render() {

    const loggedMenu = <div>Welcome!</div>
    const notLoggedMenu = <div className={this.props.signUp ? "transparent" : "navbar-btns"} >
                            <NavLink to="/login" className="navbar-login" >Log in</NavLink>
                            <NavLink to="/signup" className="navbar-signup" >Sign up</NavLink>
                          </div>

    return (
      <div className={this.state.scrolled ? "navbar scrolled" : "navbar"} >
        <NavLink onClick={() => this.props.backToHome()} className="brand" to="/" ><img src={Logo} height="32px" />Book exchanger</NavLink>
        <div></div>
        {
          this.props.logged ? loggedMenu : notLoggedMenu
        }
        {this.state.redirect ? <Redirect to="/" /> : null}
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    signUp: store.signUp || store.login,
    logged: store.logged
  }
}

const mapDispatchToProps = dispatch => {
  return {
    backToHome: () => dispatch({ type: "BACK_TO_HOME" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);