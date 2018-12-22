import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount(){
    this.props.loginView()
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogin(){
    this.setState({loginTry: true})
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
      this.setState({loginTry: false})
      if(res.message === 'Access granted'){
        this.setState({loginSuccess: true})
        this.props.loginSuccess()
      } else {
        this.setState({invalidLogin: true})
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="login-container" >
        <div className="login-form" >
          <h1>Login</h1>
          <p>Email:</p>
          <input name="email" onChange={(e) => this.handleChange(e)} value={this.state.email} type="text" />
          <p>Password:</p>
          <input name="password" onChange={(e) => this.handleChange(e)} value={this.state.password} type="password" />
          <button onClick={() => this.handleLogin()} className="login-form-btn" >Log in</button>
          <p className="login-to-signup" >Don't have an account? <NavLink to="/signup" >Sign up</NavLink></p>
          {this.state.loginTry ? <div className="login-loader" ><div></div></div> : null}
          {this.state.loginSuccess ? <Redirect to="/dashboard" /> : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginView: () => dispatch({ type: "LOGIN_VIEW" }),
    loginSuccess: () => dispatch({ type: "LOGIN_SUCCESS" })
  }
}

export default connect(null, mapDispatchToProps)(Login);