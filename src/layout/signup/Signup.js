import React, { Component } from 'react';
import './signup.css';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Input from '../../utils/inputs/input';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirm: '',
            username: '',
            location: '',
            description: ''
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
                this.state.location && this.state.description) {
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
        if (this.state.email.length > 3 && this.state.email.indexOf('@') !== -1 && this.state.email.indexOf('.') !== -1) {
            this.setState({ checkingEmail: true })
            fetch(`http://bookexchangerapi.herokuapp.com/signup/check-email/${this.state.email}`)
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
        this.setState({ userCreated: true, signUpTry: true })
        fetch('http://bookexchangerapi.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                description: this.state.description,
                location: this.state.location
            })
        })
            .then(d => d.json())
            .then(response => {
                console.log(response)
                if (response.message === 'User added successfully!') {
                    this.setState({ redirect: '/app/feed' })
                    this.props.userCreated(response.user)
                } else {
                    this.setState({error: true})
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        console.log(this.state)

        const validEmail = <i className="fas fa-check-circle"></i>
        const invalidEmail = <i className="far fa-times-circle"></i>

        const emailChecker = this.state.checkingEmail ? <div className="checking-email" ></div>
                             : this.state.validEmail ? validEmail
                             : this.state.invalidEmail ? invalidEmail
                             : null

        return (
            <div className="signup-container" >
                <div className={this.state.next ? "hidden" : "signup-form"} >
                    <h1>Sign up</h1>
                    <div className="signup-email-input" >
                        {emailChecker}
                        <Input value={this.state.email} handleChange={(e) => this.handleChange(e)} label="Email" type="text" />
                    </div>
                    <Input value={this.state.password} handleChange={(e) => this.handleChange(e)} label="Password" type="password" />
                    <Input value={this.state.confirm} handleChange={(e) => this.handleChange(e)} label="Confirm" type="password" />
                    {this.showBtn(1)}
                    <p className="signup-to-login" >Already have an account? <NavLink to="/login" >Log in</NavLink></p>
                </div>
                <div className={this.state.userCreated ? "signup-user-created" : this.state.next ? "signup-form-2" : "hidden"} >
                    <i onClick={() => this.setState({ next: false })} className="fas fa-arrow-left"></i>
                    <h1>Just a few more steps</h1>
                    <Input value={this.state.username} handleChange={(e) => this.handleChange(e)} label="Username" type="text" />
                    <div className="select-container" >
                        <select name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} >
                            <option value="" disabled defaultValue>Choose your location</option>
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="District of Columbia">District Of Columbia</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Maryland">Maryland</option>
                            <option value="Massachusetts">Massachusetts</option>
                            <option value="Michigan">Michigan</option>
                            <option value="Minnesota">Minnesota</option>
                            <option value="Mississippi">Mississippi</option>
                            <option value="Missouri">Missouri</option>
                            <option value="Montana">Montana</option>
                            <option value="Nebraska">Nebraska</option>
                            <option value="Nevada">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New York">New York</option>
                            <option value="North Carolina">North Carolina</option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Ohio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </div>
                    <textarea onChange={e => this.handleChange(e)} name="description" value={this.state.description} className="signup-user-description" placeholder="Tell us a little about yourself..." ></textarea>
                    {this.showBtn(0)}
                    <p className="small-text" >By clicking sign up you agree to our terms of services and policy.</p>
                </div>
                {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
                {this.state.signUpTry && !this.state.error ? <React.Fragment><div className="signup-try-loader" ></div><p className="signup-try-loader-text" >Creating user...</p></React.Fragment> : null}
                {this.state.error ? <div className="signup-error" >There was an error trying to create your account.<br /><span>Please try again in a few moments.</span><button onClick={() => window.location.reload()} className="signup-try-again" >Try again</button></div> : null}
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