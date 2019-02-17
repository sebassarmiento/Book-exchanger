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
        fetch(`https://bookexchangerapi.herokuapp.com/app/books/${this.props.bookId}/rating`, {
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
                this.props.notify(res.notification)
            })
            .catch(err => {
                console.log(err)
                this.props.notify({ type: 'error', message: 'There was an error adding your rating. Please try again later.' })
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
    }
    componentDidMount() {
        this.props.loaderOn()
        this.getData()
        this.route = this.props.location.pathname
    }
    componentDidUpdate() {
        if (this.route !== this.props.location.pathname) {
            this.route = this.props.location.pathname
            this.getData()
        }
    }
    getData() {
        this.setState({ fetchingData: true, data: null })
        fetch(`https://bookexchangerapi.herokuapp.com${this.props.location.pathname}`)
            .then(d => d.json())
            .then(res => {
                this.props.loaderOff()
                this.props.userData.books.liked.map(book => {
                    if (book._id === res._id) {
                        this.setState({ unadd: true })
                    }
                    return null
                })
                this.setState({ data: { ...res, messages: this.messages }, fetchingData: false })
            })
            .catch(err => {
                console.log('Error', err)
                this.props.loaderOff()
                this.setState({ fetchingData: false })
            })
    }
    handleAdd() {
        this.setState({ added: !this.state.added, unadd: !this.state.unadd, adding: true })
        if (!this.state.adding) {
            fetch(`https://bookexchangerapi.herokuapp.com/app/user/wishlist/${this.props.userData._id}`, {
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
                    this.setState({ adding: false })
                    if (res.notification && res.user) {
                        this.props.addToWishlist(res.user.books)
                        this.props.notify(res.notification)
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.props.notify({ type: 'error', message: 'There was an error adding the book to your wishlist. Please try again later' })
                })
        }
    }
    render() {
        const { data } = this.state
        return (
            <div className="individual-book" >
                {data ?
                    <div className="book-grid">
                        <div className="book-info" >
                            <div style={{ display: 'flex', width: '100%' }} >
                                <img src={`https://bookexchangerapi.herokuapp.com/${data.image}`} alt={data.name} />
                                <div style={{ flex: '1' }} >
                                    <h2>{data.name}</h2>
                                    <p>By {data.author}</p>
                                    <p><i className="fas fa-map-marker" ></i> {data.location}</p>
                                    <p>{data.pages} pages.</p>
                                    <p><strong>Owner: </strong><NavLink to={`/app/user/${data.userId}`} >{data.username}</NavLink></p>
                                    <button className="wishlist-btn"
                                        onMouseEnter={() => this.setState({ added: true })}
                                        onMouseLeave={() => this.setState({ added: false })}
                                        onClick={() => this.handleAdd()} >
                                        {this.state.unadd || this.state.added ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                        {this.state.unadd ? " Remove from wishlist" : " Add to wishlist"}
                                    </button>
                                    <BookRating
                                        notify={(category, message) => this.props.notify(category, message)}
                                        bookId={data._id}
                                        ratings={data.ratings}
                                        ratingsNumber={data.ratingsNumber}
                                        currentUser={this.props.userData._id}
                                    />
                                </div>
                            </div>
                            <div className="book-description" >
                                <p>{data.description ? data.description : "No description available."}</p>
                            </div>
                        </div>
                        {data.userId !== this.props.userData._id ?
                            <div className="book-chat" >
                                <BookChat userData={this.props.userData} currentUserId={this.props.userData._id} bookOwnerId={data.userId} messages={data.messages} title="Like this book?" subtitle="Chat with the owner." />
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
        notify: notification => dispatch({ type: 'NOTIFICATION', payload: { ...notification } }),
        loaderOn: () => dispatch({ type: "MAIN_LOADER_ON" }),
        loaderOff: () => dispatch({ type: "MAIN_LOADER_OFF" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualBook);