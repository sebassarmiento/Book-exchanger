import React, { Component } from 'react';
import './notification.css';
import { connect } from 'react-redux';

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
    componentDidMount(){
        setTimeout(() => {
            this.props.closeNotification()
        }, 5000)
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

const mapDispatchToProps = dispatch => {
    return {
        closeNotification: () => dispatch({ type: 'NOTIFICATION_CLOSE' })
    }
}

export default connect(null, mapDispatchToProps)(Notification);