import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class BookPreview extends Component {
    render() {
        return (
            <div className="book-preview" >
                <p>In <NavLink to={`/app/books/${this.props.category.toLowerCase()}`} >{this.props.category}</NavLink></p>
                <div className="book-preview-img" ><img src={this.props.image} /></div>
                <NavLink className="book-preview-title" to={`/app/books/${this.props._id}`} >{this.props.name}</NavLink>
                <p>Location: {this.props.place}</p>
                <p>Pages: {this.props.pages}</p>
            </div>
        )
    }
}

export default BookPreview;