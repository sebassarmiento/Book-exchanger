import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

class BookPreview extends Component {
    constructor(){
        super()
        this.state = {}
    }
    render() {
        return (
            <div className="book-preview" >
                <p>In <NavLink to={`/app/books/${this.props.category.toLowerCase()}`} >{this.props.category}</NavLink></p>
                <div onClick={() => this.setState({redirect: true})} className="book-preview-img" ><img src={this.props.image} /></div>
                <NavLink className="book-preview-title" to={`/app/books/id/${this.props._id}`} >{this.props.name}</NavLink>
                <p>Location: {this.props.place}</p>
                <p>Pages: {this.props.pages}</p>
                {this.state.redirect ? <Redirect to={`/app/books/id/${this.props._id}`} /> : null}
            </div>
        )
    }
}

export default BookPreview;