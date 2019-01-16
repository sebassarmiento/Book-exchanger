import React, { Component } from 'react';
import './signup.css';
import { connect } from 'react-redux';
import Loader from '../../utils/loaders/Loader1';
import { Redirect, NavLink } from 'react-router-dom';
import Input from '../../utils/inputs/input';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'seba@gmail.com',
            password: 'caca',
            confirm: 'caca',
            username: '',
            location: '',
            gender: '',
            validEmail: true
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
                this.state.location && this.state.gender) {
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

    handleGender(e) {
        this.setState({ gender: e.target.id }, () => console.log(this.state.gender))
    }

    signUp() {
        console.log('ENTRA')
        this.setState({userCreated: true, signUpTry: true})
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
                if (response.message === 'User added successfully!') {
                    this.setState({ redirect: true })
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
                <div className={this.state.next ? "hidden" : "signup-form"} >
                    <h1>Sign up</h1>
                    <Input value={this.state.email} handleChange={(e) => this.handleChange(e)} label="Email" type="text" />
                    <Input value={this.state.password} handleChange={(e) => this.handleChange(e)} label="Password" type="password" />
                    <Input value={this.state.confirm} handleChange={(e) => this.handleChange(e)} label="Confirm" type="password" />
                    {this.showBtn(1)}
                    <p className="signup-to-login" >Already have an account? <NavLink to="/login" >Log in</NavLink></p>
                </div>
                <div className={this.state.userCreated ? "signup-user-created" : this.state.next ? "signup-form" : "hidden"} >
                    <i onClick={() => this.setState({ next: false })} className="fas fa-arrow-left"></i>
                    <h1>Just a few more steps</h1>
                    <Input value={this.state.username} handleChange={(e) => this.handleChange(e)} label="Username" type="text" />
                    <div className="select-container" >
                        <select name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} >
                            <option value="" disabled defaultValue>Choose your location</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div className="select-container" >
                        <select name="gender" value={this.state.gender} onChange={(e) => this.handleChange(e)} >
                            <option value="" disabled defaultValue>Choose your gender</option>
                            <option value="Male" >Male</option>
                            <option value="Female" >Female</option>
                            <option value="Other" >Other</option>
                        </select>
                    </div>
                    {this.showBtn(0)}
                    <p className="small-text" >By clicking sign up you agree to our terms of services and policy.</p>
                </div>
                {this.state.redirect ? <Redirect to="/app/welcome-user" /> : null}
                {this.state.signUpTry ? <React.Fragment><div className="signup-try-loader" ></div><p className="signup-try-loader-text" >Creating user...</p></React.Fragment> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideFooter: () => dispatch({ type: "SIGNUP_VIEW" }),
        userCreated: userData => dispatch({ type: "NEW_USER_SIGNED", payload: userData })
    }
}

export default connect(null, mapDispatchToProps)(Signup);