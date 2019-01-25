import React, { Component } from 'react';
import './book-chat.css';

class BookChat extends Component {
    constructor() {
        super()
        this.state = {
            newMessage: ''
        }
    }

    componentDidMount() {
        this.setState({ messages: this.props.messages })
    }

    handleClick(e) {
        let messages = this.state.messages.length > 0 ? this.state.messages : null
        if (this.state.newMessage.length > 0) {
            if(messages){
                this.setState({ messages: [ ...messages, { userId: this.props.currentUserId, text: this.state.newMessage }], newMessage: '' })
            } else {
                this.setState({ messages: [{ userId: this.props.currentUserId, text: this.state.newMessage }], newMessage: '' })
            }
            fetch('http://localhost:3000/app/users/:userId/chats', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    messages: this.state.messages
                })
            })
                .then(d => d.json())
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }

    className(id) {
        console.log('ACACACAc', id, this.props.bookOwnerId, this.props.currentUserId)
        switch (id) {
            case this.props.bookOwnerId:
                return 'owner'
            case this.props.currentUserId:
                return 'user'
            default:
                return 'owner'
        }
    }

    render() {
        return (
            <div className="book-message" >
                <h4>{this.props.title} <br /><small>{this.props.subtitle}</small></h4>
                <div className="messages" >
                    {this.state.messages ? this.state.messages.map(msg => {
                        return (
                            <div className={this.className(msg.userId)} >
                                <p >{msg.text}</p>
                            </div>
                        )
                    }) : null}
                </div>
                <div className="send-message" >
                    <input onChange={(e) => this.handleChange(e)} value={this.state.newMessage} type="text" />
                    <button onClick={() => this.handleClick()} >Send</button>
                </div>
            </div>
        )
    }
}

export default BookChat;