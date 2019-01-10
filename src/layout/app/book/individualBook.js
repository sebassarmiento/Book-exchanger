import React, { Component } from 'react';
import './individual-book.css';
import { NavLink } from 'react-router-dom';
import timeAgo from '../../../utils/TimeAgo';
import { connect } from 'react-redux';

class BookRating extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    handleRate(){
        this.setState({rated: this.state.stars})
    }
    render() {
        return (
            <React.Fragment>
                <div className="i-b-rating" >
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({stars: 0})} onMouseEnter={() => this.setState({stars: 1})} className={`${this.state.stars > 0 || this.state.rated > 0 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({stars: 0})} onMouseEnter={() => this.setState({stars: 2})} className={`${this.state.stars > 1 || this.state.rated > 1 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({stars: 0})} onMouseEnter={() => this.setState({stars: 3})} className={`${this.state.stars > 2 || this.state.rated > 2 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({stars: 0})} onMouseEnter={() => this.setState({stars: 4})} className={`${this.state.stars > 3 || this.state.rated > 3 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({stars: 0})} onMouseEnter={() => this.setState({stars: 5})} className={`${this.state.stars > 4 || this.state.rated > 4 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                </div>
                <small style={{ marginLeft: 4 }} >{this.props.ratings || 0} ratings</small>
            </React.Fragment>
        )
    }
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
                console.log(res._id, this.props.userData.books.liked)
                this.props.userData.books.liked.map(book => {
                    if (book._id === res._id) {
                        return this.setState({ unadd: true })
                    }
                })
                this.setState({ data: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleAdd() {
        this.setState({ added: !this.state.added, unadd: !this.state.unadd })
        fetch(`http://localhost:3000/app/user/wishlist/${this.props.userData._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.userData.token
            },
            body: JSON.stringify({
                book: this.state.data
            })
        })
            .then(d => d.json())
            .then(res => {
                console.log(res)
                if (res.message) {
                    this.props.addToWishlist(res.user.books)
                }
            })
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
                                                onMouseEnter={() => this.setState({ added: true })}
                                                onMouseLeave={() => this.setState({ added: false })}
                                                onClick={() => this.handleAdd()} >
                                                {this.state.unadd || this.state.added ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                                {this.state.unadd ? "Remove from wishlist" : "Add to wishlist"}
                                            </button>
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

const mapStateToProps = store => {
    return {
        userData: store.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToWishlist: book => dispatch({ type: 'ADD_BOOK_TO_WISHLIST_IN_STORE', payload: book })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualBook);