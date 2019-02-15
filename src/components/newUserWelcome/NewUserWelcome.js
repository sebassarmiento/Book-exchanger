import React, { Component } from 'react';
import './new-user-welcome.css';
import { connect } from 'react-redux';

class NewUserWelcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            closing: ''
        }
    }
    handleClose() {
        this.setState({ closing: 'closing' })
        setTimeout(() => {
            this.props.closeUserWelcome()
        }, 400)
    }
    render() {
        return (
            <React.Fragment>
            <div className={`user-welcome ${this.state.closing}`} >
            </div>
            <div className={`user-welcome-container ${this.state.closing}`} >
                <h2>Welcome aboard {this.props.username}!</h2>
                <p>I'm Sebastian Sarmiento, the creator of this app. I hope you find some interesting books and share yours, have fun exchanging knowledge and feel free to message me if you have any questions!</p>
                <button onClick={() => this.handleClose()} >Got it! <i className="far fa-thumbs-up"></i></button>
            </div>
            </React.Fragment>
    )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeUserWelcome: () => dispatch({ type: 'CLOSE_USER_WELCOME' })
    }
}

export default connect(null, mapDispatchToProps)(NewUserWelcome);