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
    this.setState({loginTry: true, invalidLogin: false})
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
        this.props.loginSuccess({...res.user})
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
          {this.state.invalidLogin ? <p className="invalid-login" >Invalid username or password.</p> : <p style={{opacity: 0}} className="invalid-login" >Invalid username or password.</p>}
          <button onClick={() => this.handleLogin()} className="login-form-btn" >Log in</button>
          <p className="login-to-signup" >Don't have an account? <NavLink to="/signup" >Sign up</NavLink></p>
          {this.state.loginTry ? <div className="login-loader" ><div></div></div> : null}
          {this.state.loginSuccess ? <Redirect to="/app/dashboard" /> : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginView: () => dispatch({ type: "LOGIN_VIEW" }),
    loginSuccess: userData => dispatch({ type: "LOGIN_SUCCESS" , payload: {...userData} })
  }
}

export default connect(null, mapDispatchToProps)(Login);