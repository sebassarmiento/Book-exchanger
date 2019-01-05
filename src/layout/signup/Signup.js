import React, { Component } from 'react';
import './signup.css';
import { connect } from 'react-redux';
import Loader from '../../utils/loaders/Loader1';
import { Redirect, NavLink } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'seba@gmail.com',
            password: 'caca',
            confirm: 'caca',
            username: '',
            gender: null,
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
                this.state.confirm.length === this.state.password.length
                &&
                this.state.validEmail) {
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
                this.state.age && this.state.gender) {
                return <button
                onClick={() => this.signUp()}
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
        this.setState({gender: e.target.id}, () => console.log(this.state.gender))
    }

    signUp(){
        console.log('ENTRA')
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                gender: this.state.gender,
                age: this.state.age
            })
        })
        .then(d => d.json())
        .then(response => {
            console.log(response)
            if(response.message === 'User added successfully!'){
                this.setState({userCreated: true, redirect: true})
                this.props.userCreated(response.user)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {

        console.log(this.state)

        const validEmail = <p className="valid-email-text" >Email is available!</p>
        const invalidEmail = <p className="invalid-email-text" >Email is already taken!</p>
        const emailChecker = this.state.checkingEmail ? <Loader size={"small"} /> : this.state.validEmail ? validEmail : this.state.invalidEmail ? invalidEmail : null

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
                    <p className="signup-to-login" >Already have an account? <NavLink to="/login" >Log in</NavLink></p>
                </div>
                <div className={this.state.userCreated ? "signup-user-created" : this.state.next ? null : "hidden"} >
                    <i onClick={() => this.setState({ next: false })} className="fas fa-arrow-left"></i>
                    <h1>Just a few more steps</h1>
                    <p>* Pick a username:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.username} name="username" type="text" />
                    <p>* Gender:</p>
                    <span className="signup-gender-options" onChange={(e) => this.handleGender(e)} >
                        <span > 
                            <input id="male-radio" name="gender" type="radio" />
                            <label htmlFor="male" >Male</label>
                        </span>
                        <span>
                            <input id="female-radio" name="gender" type="radio" />
                            <label htmlFor="female" >Female</label>
                        </span>
                        <span>
                            <input id="other-radio" name="gender" type="radio" />
                            <label htmlFor="other" >Other</label>
                        </span>
                    </span>
                    <p>* Age:</p>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.state} name="age" type="number" />
                    {this.showBtn(0)}
                </div>
                {this.state.redirect ? <Redirect to="/app/welcome-user" /> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideFooter: () => dispatch({ type: "SIGNUP_VIEW" }),
        userCreated: userData => dispatch({ type: "NEW_USER_SIGNED" , payload: userData})
    }
}

export default connect(null, mapDispatchToProps)(Signup);