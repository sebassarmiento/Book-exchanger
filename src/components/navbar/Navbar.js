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
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
    window.onscroll = this.handleScroll.bind(this)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate() {
    if (!this.props.footer && (this.props.signUp || this.props.login) && !this.state.signin) {
      this.setState({ signin: true })
    } else if (this.props.footer && this.state.signin) {
      this.setState({ signin: false })
    }
  }

  handleScroll() {
    if (this.mounted) {
      if (window.scrollY > 500) {
        this.setState({ scrolled: true })
      } else {
        this.setState({ scrolled: false })
      }
    }
  }

  render() {
    return (
      <div className={`navbar ${this.state.scrolled ? 'scrolled' : ''} ${this.state.signin ? 'signin' : ''}`} >
        <NavLink onClick={() => this.props.backToHome()} className="brand" to="/" ><img src={Logo} alt="brand-logo" height="32px" />Book exchanger</NavLink>
        <div className="navbar-whitespace" ></div>
        <div className={this.props.signUp ? "transparent" : "navbar-btns"} >
          <NavLink to="/login" className="navbar-login" >Log in</NavLink>
          <NavLink to="/signup" className="navbar-signup" >Sign up</NavLink>
        </div>
        {this.state.redirect ? <Redirect to="/" /> : null}
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    signUp: store.signUp || store.login,
    logged: store.logged,
    footer: store.footer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    backToHome: () => dispatch({ type: "BACK_TO_HOME" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);