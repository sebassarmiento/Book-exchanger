import React, { Component } from 'react';
import './notifications.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Notifications extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    handleClose(){
        this.setState({ closing: true })
        setTimeout(() => {
            this.props.closeNotificationsView()
        }, 400)
    }
    handleClick(e, n){
        console.log('MI NOTIFICATION', n)
        this.setState({ redirect: `/app/books/id/${n.link}` })
        this.handleClose()
    }
    render() {
        const closing = this.state.closing ? 'close-notifications' : ''
        return (
            <div className={`notifications-bg ${closing}`} onClick={() => this.handleClose()} >
                <div onClick={e => e.stopPropagation()} className="notifications-container" >
                    <h2>Your notifications<i onClick={() => this.handleClose()} className="fa fa-times" ></i></h2>
                    <div className="notifications-display" >
                        {this.props.notifications.map(n => {
                            return (
                                <div onClick={(e) => this.handleClick(e, n)} className="n-v-notification" >
                                    <i className="fa fa-check-circle" ></i>
                                    <p>{n.message}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        notifications: store.userData.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeNotificationsView: () => dispatch({ type: "CLOSE_NOTIFICATIONS_VIEW" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);