import React, { Component } from 'react';
import './individual-book.css';
import { NavLink } from 'react-router-dom';
import timeAgo from '../../../utils/TimeAgo';

const BookRating = props => {
    return (
    <React.Fragment>
    <div className="i-b-rating" >
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
    </div>
    <small style={{marginLeft: 4}} >{props.ratings || 0} ratings</small>
    </React.Fragment>
    )
}

class IndividualBook extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        fetch(`http://localhost:3000${this.props.location.pathname}`)
            .then(d => d.json())
            .then(res => {
                console.log(res)
                this.setState({ data: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleAdd(){
        this.setState({added: !this.state.added, unadd: !this.state.unadd})
    }
    render() {
        return (
            <div className="individual-book" >
                {this.state.data ?
                    <React.Fragment>
                        <NavLink className="back-btn" to="/app/feed" ><h3><i className="fas fa-chevron-left"></i><small>Back</small></h3></NavLink>
                        <div className="individual-book-info" >
                            <img src={this.state.data.image} alt={this.state.data.name} />
                            <div>
                                <h6>In <NavLink to={`/app/books/${this.state.data.category.toLowerCase()}`} >{this.state.data.category}</NavLink></h6>
                                <h2>{this.state.data.name}</h2>
                                <div className="i-b-data" >
                                    <div>
                                        <p>By {this.state.data.author}</p>
                                        <p>{timeAgo(this.state.data.date)} ago</p>
                                        <p><strong>Location: </strong>{this.state.data.place}</p>
                                        <p><strong>Pages: </strong>{this.state.data.pages}</p>
                                        <p><strong>Owner: </strong><NavLink to={`/app/user/${this.state.data.userId}`} >{this.state.data.username}</NavLink></p>
                                        <BookRating />
                                    </div>
                                    <div className="i-b-interact" >
                                        <div>
                                            <button 
                                            onMouseEnter={() => this.setState({added: true})}
                                            onMouseLeave={() => this.setState({added: false})}
                                            onClick={() => this.handleAdd()} >{this.state.unadd || this.state.added ? <i class="fas fa-heart"></i> : <i class="far fa-heart"></i>} {this.state.unadd ? "Remove from wishlist" : "Add to wishlist"}</button>
                                            <button>Message the owner</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="individual-book-description" >
                            <p>{this.state.data.description}</p>
                        </div>
                    </React.Fragment>
                    :
                    null
                }
            </div>
        )
    }
}

export default IndividualBook;