import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class BookPreview extends Component {
    render() {
        return (
            <div className="book-preview" >
                <p>In <NavLink to={`/app/books/${this.props.category}`} >{this.props.category}</NavLink></p>
                <img src="//unsplash.it/200/200" />
                <NavLink className="book-preview-title" to={`/app/books/${this.props._id}`} >{this.props.name}</NavLink>
                <p>Location: {this.props.place}</p>
                <p>Pages: {this.props.pages}</p>
            </div>
        )
    }
}

export default BookPreview;