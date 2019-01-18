import React, { Component } from 'react';
import './notification.css';

class Notification extends Component {
    constructor(props) {
        super(props)
    }
    icon(){
        switch(this.props.category){
            case 'success':
            return <i className="far fa-check-circle"></i>
            case 'error':
            return <i className="fas fa-exclamation-triangle"></i>
            default:
            return <i className="far fa-check-circle"></i>
        }
    }
    render() {
        return (
            <div className="notification" >
                <p>{this.props.message}</p>
                {this.icon()}
            </div>
        )
    }
}

export default Notification;