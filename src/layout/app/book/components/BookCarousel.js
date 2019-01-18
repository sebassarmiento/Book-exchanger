import React, { Component } from 'react';
import LayoutLoader from '../../../../utils/loaders/LayoutLoader';
import './book-carousel.css';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class BookCarousel extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.otherBooks = React.createRef()
        this.interval = null
        this.count = 0
    }
    componentDidMount() {
        fetch(this.props.url)
        .then(d => d.json())
        .then(res => {
            console.log('AQUI', res)
            this.setState({data: res})
        })
        .catch(err => {
            console.log(err)
        })
    }
    handleScroll(rightArrow){
        let maxScroll = this.otherBooks.current.scrollWidth - this.otherBooks.current.clientWidth

        if(rightArrow && this.otherBooks.current.scrollLeft !== maxScroll && !this.interval){
            this.count += 400
            this.interval = setInterval(() => {
                this.otherBooks.current.scrollLeft += 3
                if(this.otherBooks.current.scrollLeft === maxScroll || this.otherBooks.current.scrollLeft > this.count){
                    clearInterval(this.interval)
                    this.interval = null
                    console.log('Se para')
                }
            }, 1)
        } else if(!rightArrow && this.otherBooks.current.scrollLeft !== 0 && !this.interval) {
            this.count -= 400
            this.interval = setInterval(() => {
                this.otherBooks.current.scrollLeft -= 3
                console.log('Se ejecuta', this.scrollPublished)
                if(this.otherBooks.current.scrollLeft === 0 || this.otherBooks.current.scrollLeft < this.count ){
                    clearInterval(this.interval)
                    this.interval = null
                    console.log('Se para')
                }
            }, 1)
        }
    }
    handleRedirect(id){
        this.setState({redirect: id})
        this.props.redirect()
    }
    render() {
        const { data } = this.state
        return (
            <div className="book-carousel" >
                <h4>Other books you might like</h4>
                {data && data.length > 5 ? <i onClick={() => this.handleScroll()} className="fas fa-angle-left"></i> : null}
                <div ref={this.otherBooks} className="carousel-books" >
                    {data && data.length > 0 ? data.map(book => {
                        return (<img src={book.image} className="profile-book-preview" onClick={() => this.handleRedirect(book._id)} />)
                    }) : <LayoutLoader />}
                </div>
                {data && data.length > 5 ? <i onClick={() => this.handleScroll(1)} className="fas fa-angle-right"></i> : null}
                {this.state.redirect ? <Redirect to={`/app/books/id/${this.state.redirect}`} /> : null}
            </div>
        )
    }
}
