import React, { Component } from 'react';
import './individual-book.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LayoutLoader from '../../../utils/loaders/LayoutLoader';
import BookChat from '../../../components/chat/BookChat';

class BookRating extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        console.log(this.props.ratingsNumber)
        this.setState({ rated: this.props.ratingsNumber })
    }
    handleRate() {
        this.setState({ rated: this.state.stars, ratingCount: true })
        fetch(`http://localhost:3000/app/books/${this.props.bookId}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.currentUser,
                rating: this.state.stars
            })
        })
            .then(d => d.json())
            .then(res => {
                console.log('ACAAAAAAAA EL RATING', res)
                this.props.notify(res.notification)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <React.Fragment>
                <div className="i-b-rating" >
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({ stars: 0 })} onMouseEnter={() => this.setState({ stars: 1 })} className={`${this.state.stars > 0 || this.state.rated > 0 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({ stars: 0 })} onMouseEnter={() => this.setState({ stars: 2 })} className={`${this.state.stars > 1 || this.state.rated > 1 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({ stars: 0 })} onMouseEnter={() => this.setState({ stars: 3 })} className={`${this.state.stars > 2 || this.state.rated > 2 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({ stars: 0 })} onMouseEnter={() => this.setState({ stars: 4 })} className={`${this.state.stars > 3 || this.state.rated > 3 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                    <i onClick={() => this.handleRate()} onMouseLeave={() => this.setState({ stars: 0 })} onMouseEnter={() => this.setState({ stars: 5 })} className={`${this.state.stars > 4 || this.state.rated > 4 ? "rating-hover fas fa-star" : "far fa-star"}`}></i>
                </div>
                <small style={{ marginLeft: 4 }} >{(this.props.ratings.length || 0) + (this.state.ratingCount ? 1 : 0)} ratings</small>
            </React.Fragment>
        )
    }
}

class IndividualBook extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.route = ''
        this.messages = [{text: 'Hey men i like your book!', userId: '5c3384e3f728c50d5a46984e'}, {text: 'Thanks man, i like yours of Harry Potter', userId: '5c30e27d6d273619c7ffa122'}, {text: 'Awesome lets exchange them!', userId: '5c3384e3f728c50d5a46984e'}]
    }
    componentDidMount() {
        this.getData()
        this.route = this.props.location.pathname
    }
    componentDidUpdate() {
        if (this.route !== this.props.location.pathname) {
            console.log('Fetching data!')
            this.route = this.props.location.pathname
            this.getData()
        }
    }
    getData() {
        this.setState({ fetchingData: true, data: null })
        console.log('MI URL ', this.props.location.pathname)
        fetch(`http://localhost:3000${this.props.location.pathname}`)
            .then(d => d.json())
            .then(res => {
                console.log('ENTRA POR ACA', res)
                console.log(res._id, this.props.userData.books.liked)
                this.props.userData.books.liked.map(book => {
                    if (book._id === res._id) {
                        this.setState({ unadd: true })
                    }
                    return null
                })
                this.setState({ data: {...res, messages: this.messages}, fetchingData: false })
            })
            .catch(err => {
                console.log('Error',err)
            })
    }
    handleAdd() {
        this.setState({ added: !this.state.added, unadd: !this.state.unadd, adding: true })
        if (!this.state.adding) {
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
                    this.setState({ adding: false })
                    if (res.notification && res.user) {
                        console.log('ENTRA!')
                        this.props.addToWishlist(res.user.books)
                        this.props.notify(res.notification)
                    }
                })
        }
    }
    render() {
        console.log(this.state.data)
        return (
            <div className="individual-book" >
                {this.state.data ?
                    <div className="book-grid">
                        <div className="book-info" >
                            <img src={this.state.data.image} alt={this.state.data.name} />
                            <div>
                                <h6>In <NavLink to={`/app/books/${this.state.data.category.toLowerCase()}`} >{this.state.data.category}</NavLink></h6>
                                <h2>{this.state.data.name}</h2>
                                <p>{this.state.data.author}</p>
                                <p><i className="fas fa-map-marker" ></i> {this.state.data.location}</p>
                                <p>{this.state.data.pages} pages.</p>
                                <p><strong>Owner: </strong><NavLink to={`/app/user/${this.state.data.userId}`} >{this.state.data.username}</NavLink></p>
                                <button className="wishlist-btn"
                                    onMouseEnter={() => this.setState({ added: true })}
                                    onMouseLeave={() => this.setState({ added: false })}
                                    onClick={() => this.handleAdd()} >
                                    {this.state.unadd || this.state.added ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                    {this.state.unadd ? " Remove from wishlist" : " Add to wishlist"}
                                </button>
                                <BookRating
                                    notify={(category, message) => this.props.notify(category, message)}
                                    bookId={this.state.data._id}
                                    ratings={this.state.data.ratings}
                                    ratingsNumber={this.state.data.ratingsNumber}
                                    currentUser={this.props.userData._id}
                                />
                            </div>
                            <div className="book-description" >
                                <p>{this.state.data.description ? this.state.data.description : "No description available."}</p>
                            </div>
                        </div>
                        {this.state.data.userId !== this.props.userData._id ? 
                        <div className="book-chat" >
                            <BookChat userData={this.props.userData} currentUserId={this.props.userData._id} bookOwnerId={this.state.data.userId} messages={this.state.data.messages} title="Like this book?" subtitle="Chat with the owner." />
                        </div> : null}
                    </div>
                    :
                    null
                }
                {this.state.fetchingData ? <LayoutLoader /> : null}
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
        addToWishlist: book => dispatch({ type: 'ADD_BOOK_TO_WISHLIST_IN_STORE', payload: book }),
        notify: notification => dispatch({ type: 'NOTIFICATION', payload: {...notification} })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualBook);