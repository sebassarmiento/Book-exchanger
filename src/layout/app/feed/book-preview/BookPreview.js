import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import timeAgo from '../../../../utils/TimeAgo';
import './book-preview.css';

class BookPreview extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="book-preview" >
                <p>In <NavLink to={`/app/books/${this.props.category.toLowerCase()}`} >{this.props.category}</NavLink><span style={{float: 'right', fontSize: '0.9em'}} >{timeAgo(this.props.date)} ago</span></p>
                <div onClick={() => this.setState({redirect: true})} className="book-preview-img" ><img src={`http://localhost:3000/${this.props.image}`} alt="book-preview" /></div>
                <p><i className="fas fa-map-marker"></i> {this.props.location}</p>
                <NavLink className="book-preview-title" to={`/app/books/id/${this.props._id}`} >{this.props.name}</NavLink>
                {this.state.redirect ? <Redirect to={`/app/books/id/${this.props._id}`} /> : null}
            </div>
        )
    }
}

export default BookPreview;