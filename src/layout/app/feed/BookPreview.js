import React, { Component } from 'react'

class BookPreview extends Component {
    render() {
        return (
            <div className="book-preview" >
                <p>In {this.props.category}</p>
                <img src="//unsplash.it/200/200" />
                <h3>{this.props.name}</h3>
                <p>Location: {this.props.place}</p>
                <p>Pages: {this.props.pages}</p>
            </div>
        )
    }
}

export default BookPreview;