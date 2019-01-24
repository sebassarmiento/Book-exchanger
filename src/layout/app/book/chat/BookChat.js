import React, { Component } from 'react';
import './book-chat.css';

class BookChat extends Component {
    render() {
        return (
            <div className="book-message" >
                <h4>Like this book? <br /><small>Leave a message to the owner.</small></h4>
                <div className="messages" >
                    <div className="user" >
                        <p >Hey men i like your book!</p>
                    </div>
                    <div className="owner" >
                        <p >Thanks dude, come and get it.</p>
                    </div>
                    <div className="user" >
                        <p >Hey men i like your book!</p>
                    </div>
                    <div className="owner" >
                        <p >Thanks dude, come and get it.</p>
                    </div>
                    <div className="user" >
                        <p >Hey men i like your book!</p>
                    </div>
                    <div className="owner" >
                        <p >Thanks dude, come and get it.</p>
                    </div>
                    <div className="user" >
                        <p >Hey men i like your book!</p>
                    </div>
                    <div className="owner" >
                        <p >Thanks dude, come and get it.</p>
                    </div>
                </div>
                <div className="send-message" >
                    <input type="text" />
                    <button >Send</button>
                </div>
            </div>
        )
    }
}

export default BookChat;