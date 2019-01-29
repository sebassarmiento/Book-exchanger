import React, { Component } from 'react';
import './book-chat.css';
import { connect } from 'react-redux';

class BookChat extends Component {
    constructor() {
        super()
        this.state = {
            newMessage: ''
        }
    }

    componentDidMount() {
        console.log(this.props.userData.chats, this.props.bookOwnerId)
        let chatId = this.props.userData.chats.find(c => c.userId === this.props.bookOwnerId)
        if (chatId) {
            console.log('Mi chat id!', chatId)
            this.setState({ chatId: chatId.chatId })
            fetch(`http://localhost:3000/app/chats/${chatId.chatId}`)
                .then(d => d.json())
                .then(res => {
                    console.log('Chat existe!', res)
                    this.setState({ messages: res.messages })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            fetch('http://localhost:3000/app/chats/newChat', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    users: [this.props.currentUserId, this.props.bookOwnerId]
                })
            })
                .then(d => d.json())
                .then(res => {
                    console.log('Chat fue creado!', res)
                    this.setState({ messages: res.messages, chatId: res._id })
                    this.props.chatCreated(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleClick(e) {
        let messages = this.state.messages.length > 0 ? this.state.messages : null
        if (this.state.newMessage.length > 0) {
            console.log("Agregamos msg al chat existente")
            fetch('http://localhost:3000/app/chats/' + this.state.chatId, {
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
                    console.log('Mensaje agregado', res)
                })
                .catch(err => {
                    console.log('Error', err)
                })
            if (messages) {
                this.setState({ messages: [...messages, { userId: this.props.currentUserId, text: this.state.newMessage }], newMessage: '' })
            } else {
                this.setState({ messages: [{ userId: this.props.currentUserId, text: this.state.newMessage }], newMessage: '' })
            }
        }
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }

    className(id) {
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
        console.log('ACAMISTATE', this.state)
        return (
            <div className="book-message" >
                <h4>{this.props.title} <br /><small>{this.props.subtitle}</small></h4>
                <div className="messages" >
                    {this.state.messages && this.state.messages.length > 0 ? this.state.messages.map(msg => {
                        return (
                            <div key={msg.text} className={this.className(msg.userId)} >
                                <p >{msg.text}</p>
                            </div>
                        )
                    }) : <p className="no-messages" >No messages to show.</p>}
                </div>
                <div className="send-message" >
                    <input onChange={(e) => this.handleChange(e)} value={this.state.newMessage} type="text" />
                    <button onClick={() => this.handleClick()} >Send</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        userData: store.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chatCreated: chat => dispatch({ type: 'CHAT_CREATED', payload: { userId: chat.users[1], chatId: chat._id } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookChat);