import React, { Component } from 'react';
import './signup.css';
import { connect } from 'react-redux';
import Loader from '../../utils/loaders/Loader1';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'seba@gmail.com',
            password: 'caca',
            confirm: 'caca',
            username: '',
            age: 0
        }
    }

    componentDidMount() {
        this.props.hideFooter()
    }

    showBtn(val) {
        if (val) {
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
        } else {
            if (this.state.username.length > 3
                &&
                this.state.password.length > 3
                &&
                this.state.age) {
                return <button
                    onClick={() => this.setState({ next: true })}
                    className="signup-form-next-btn" >Sign up
                       </button>
            } else {
                return <button
                    className="signup-form-next-btn-disabled" >Sign up
                    </button>
            }
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, e.target.name === 'email' ? this.checkEmail : null)
    }

    checkEmail() {
        if (this.state.email.length > 3) {
            this.setState({ checkingEmail: true })
            fetch(`http://localhost:3000/signup/check-email/${this.state.email}`)
                .then(d => d.json())
                .then(res => {
                    this.setState({ checkingEmail: false })
                    console.log(res)
                    if (res.message === 'Email is available!') {
                        this.setState({ validEmail: true, invalidEmail: false })
                    } else {
                        this.setState({ invalidEmail: true, validEmail: false })
                    }
                })
                .catch(err => {
                    this.setState({ checkingEmail: false })
                    console.log(err)
                })
        }
    }

    handleGender(e){
        this.setState({gender: e.target.value})
        console.log(this.state.gender)
    }

    render() {

        const validEmail = <p className="valid-email-text" >Email is available!</p>
        const invalidEmail = <p className="invalid-email-text" >Email is already taken!</p>
        const emailChecker = this.state.checkingEmail ? <Loader /> : this.state.validEmail ? validEmail : this.state.invalidEmail ? invalidEmail : null

        return (
            <div className="signup-container" >
                <div className={this.state.next ? "hidden" : null} >
                    <h1>Welcome to book exchanger!</h1>
                    <span className="signup-email" ><p>* Email:</p> {emailChecker}</span>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.email} name="email" type="text" />
                    <p>* Password:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.password} name="password" type="password" />
                    <p>* Confirm password:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.confirm} name="confirm" type="password" />
                    {this.showBtn(1)}
                </div>
                <div className={this.state.next ? null : "hidden"} >
                    <i onClick={() => this.setState({ next: false })} className="fas fa-arrow-left"></i>
                    <h1>Just a few more steps</h1>
                    <p>* Pick a username:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.username} name="username" type="text" />
                    <p>* Gender:</p>
                    <span className="signup-gender-options" >
                        <span>
                            <input name="gender" type="radio" />
                            <label onChange={(e) => this.handleGender(e)} htmlFor="male" >Male</label>
                        </span>
                        <span>
                            <input name="gender" type="radio" />
                            <label onChange={(e) => this.handleGender(e)} htmlFor="female" >Female</label>
                        </span>
                        <span>
                            <input name="gender" type="radio" />
                            <label onChange={(e) => this.handleGender(e)} htmlFor="other" >Other</label>
                        </span>
                    </span>
                    <p>* State:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.state} name="state" type="text" />
                    {this.showBtn(0)}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideFooter: () => dispatch({ type: "SIGNUP_VIEW" })
    }
}

export default connect(null, mapDispatchToProps)(Signup);