import React, { Component } from 'react';
import './notifications.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Notifications extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        fetch(`http://localhost:3000/app/user/open-notifications/${this.props.userId}`)
        .then(d => d.json())
        .then(res => {
            console.log(res)
        })
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
        console.log(this.props.notifications)
        const closing = this.state.closing ? 'close-notifications' : ''
        return (
            <React.Fragment>
            <div className={`notifications-bg ${closing}`} onClick={() => this.handleClose()} >
            </div>
            <div className={`notifications-container ${closing}`} >
            <h2>Your notifications ({this.props.notifications.length}) <i onClick={() => this.handleClose()} className="fa fa-times" ></i></h2>
            <div className="notifications-display" >
                {this.props.notifications.slice(0).reverse().map(n => {
                    return (
                        <div onClick={(e) => this.handleClick(e, n)} className="n-v-notification" >
                            {!n.opened ? <span>New!</span> : null}
                            <i className="fa fa-check-circle" ></i>
                            <p>{n.message}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        </React.Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        userId: store.userData._id,
        notifications: store.userData.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeNotificationsView: () => dispatch({ type: "CLOSE_NOTIFICATIONS_VIEW" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);