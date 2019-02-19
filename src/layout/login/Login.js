import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Input from '../../utils/inputs/input';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.loginView()
  }

  handleChange(e) {
    if(e.target.value.length < 60){
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleLogin() {
    this.setState({ loginTry: true, invalidLogin: false })
    this.props.loaderOn()
    fetch('https://bookexchangerapi.herokuapp.com/login', {
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
          this.props.loaderOff()
        }
      })
      .catch(err => {
        console.log(err)
        this.props.loaderOff()
      })
  }

  render() {
    return (
      <div className="login-container" >
        <div className={`login-form ${this.state.loginTry ? "blur" : ''}`} >
          <h1>Login</h1>
          <Input value={this.state.email} handleChange={(e) => this.handleChange(e)} label="Email" type="text" />
          <Input value={this.state.password} handleChange={(e) => this.handleChange(e)} label="Password" type="password" />
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
    loginSuccess: userData => dispatch({ type: "LOGIN_SUCCESS", payload: { ...userData } }),
    loaderOn: () => dispatch({ type: 'MAIN_LOADER_ON' }),
    loaderOff: () => dispatch({ type: 'MAIN_LOADER_OFF' })
  }
}

export default connect(null, mapDispatchToProps)(Login);