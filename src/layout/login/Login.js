import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.loginView()
  }

  render() {
    return (
      <div className="login-container" >
        <h1>LOGIN FORM</h1>
        <h1>LOGIN FORM</h1>
        <h1>LOGIN FORM</h1>
        <h1>LOGIN FORM</h1>
        <h1>LOGIN FORM</h1>
        <h1>LOGIN FORM</h1>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginView: () => dispatch({ type: "LOGIN_VIEW" })
  }
}

export default connect(null, mapDispatchToProps)(Login);