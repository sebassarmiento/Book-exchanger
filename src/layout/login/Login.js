import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'sebi_sarmiento@hotmail.com',
      password: 'caca'
    }
  }

  componentDidMount() {
    this.props.loginView()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin() {
    this.setState({ loginTry: true, invalidLogin: false })
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ loginTry: false })
        if (res.message === 'Auth successful') {
          this.setState({ loginSuccess: true })
          this.props.loginSuccess({ ...res.user, token: res.token })
        } else {
          this.setState({ invalidLogin: true })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="login-container" >
        <div className={`login-form ${this.state.loginTry ? "blur" : ''}`} >
          <h1>Login</h1>
          <div className="login-input" >
            <input autoComplete="off" required id="email-login" name="email" onChange={(e) => this.handleChange(e)} value={this.state.email} type="text" />
            <label htmlFor="email-login" >Email</label>
          </div>
          <div className="login-input" >
            <input autoComplete="off" required id="password-login" name="password" onChange={(e) => this.handleChange(e)} value={this.state.password} type="password" />
            <label htmlFor="password-login" >Password</label>
          </div>
          <p className={this.state.invalidLogin ? "invalid-login" : "invalid-login-hidden"} >Invalid email or password.</p>
          <button onClick={() => this.handleLogin()} className="login-form-btn" >Log in</button>
          <p className="login-to-signup" >Don't have an account? <NavLink to="/signup" >Sign up</NavLink></p>
          {this.state.loginSuccess ? <Redirect to="/app/feed" /> : null}
        </div>
        {this.state.loginTry ? <div className="login-loader" ><div></div><div></div></div> : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginView: () => dispatch({ type: "LOGIN_VIEW" }),
    loginSuccess: userData => dispatch({ type: "LOGIN_SUCCESS", payload: { ...userData } })
  }
}

export default connect(null, mapDispatchToProps)(Login);