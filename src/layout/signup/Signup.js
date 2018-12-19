import React, { Component } from 'react';
import './signup.css';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirm: '',
            username: '',
            country: '',
            state: ''
        }
    }

    showBtn() {
        if (this.state.email.length > 3
            &&
            this.state.password.length > 3
            &&
            this.state.confirm.length === this.state.password.length) {
            return <button
                onClick={() => this.setState({ next: true })}
                className="signup-form-next-btn" >Next
                   </button>
        } else {
            return <button
            className="signup-form-next-btn-disabled" >Next
        </button>
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="signup-container" >
                <div className={this.state.next ? "hidden" : "signup-first"} >
                    <h1>Welcome to book exchanger!</h1>
                    <p>* Email:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.email} name="email" type="text" />
                    <p>* Password:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.password} name="password" type="password" />
                    <p>* Confirm password:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.confirm} name="confirm" type="password" />
                    {this.showBtn()}
                </div>
                <div className={this.state.next ? "signup-second" : "hidden"} >
                    <i onClick={() => this.setState({next: false})} className="fas fa-arrow-left"></i>
                    <h1>Just a few more steps</h1>
                    <p>* Pick a username:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.username} name="username" type="text" />
                    <p>* Country:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.country} name="country" type="text" />
                    <p>* State:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.state} name="state" type="text" />
                    <button className="signup-form-next-btn" >Next</button>
                </div>
            </div>
        )
    }
}

export default Signup;