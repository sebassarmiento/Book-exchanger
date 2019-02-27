import React, { Component } from 'react';
import './book-carousel.css';
import LayoutLoader from '../../utils/loaders/LayoutLoader';
import { Redirect } from 'react-router-dom';

class BookCarousel extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.interval = null
        this.scrollComponent = React.createRef()
        this.count = 0
    }

    handleScroll(rightArrow){
        let maxScroll = this.scrollComponent.current.scrollWidth - this.scrollComponent.current.clientWidth

        if(rightArrow && this.scrollComponent.current.scrollLeft !== maxScroll && !this.interval){
            this.count += 400
            this.interval = setInterval(() => {
                this.scrollComponent.current.scrollLeft += 3
                if(this.scrollComponent.current.scrollLeft === maxScroll || this.scrollComponent.current.scrollLeft > this.count){
                    clearInterval(this.interval)
                    this.interval = null
                }
            }, 1)
        } else if(!rightArrow && this.scrollComponent.current.scrollLeft !== 0 && !this.interval) {
            this.count -= 400
            this.interval = setInterval(() => {
                this.scrollComponent.current.scrollLeft -= 3
                if(this.scrollComponent.current.scrollLeft === 0 || this.scrollComponent.current.scrollLeft < this.count ){
                    clearInterval(this.interval)
                    this.interval = null
                }
            }, 1)
        }
    }

    render() {
        const scroll = this.props.books && this.props.books.length > 5 ? true : false
        return (
            <div className="book-carousel" >
                <h4>{this.props.title} - {this.props.books.length}</h4>
                {scroll ? <div onClick={() => this.handleScroll()} className="left-arrow-container" ><i className="fas fa-angle-left"></i></div> : null}
                <div ref={this.scrollComponent} className="book-carousel-scrollable" >
                    {this.props.books && this.props.books.length > 0 ? this.props.books.map(b => {
                        console.log(b.image)
                        return (<img alt={b.name} onClick={() => this.setState({ redirect: b._id })} className="book-preview" src={b.image.startsWith('public') ? `https://bookexchangerapi.herokuapp.com/${b.image}` : b.image} />)
                    }) : this.props.books ? <p className="no-data" >No books to show.</p> : <LayoutLoader />}
                </div>
                {scroll ? <div onClick={() => this.handleScroll(1)} className="right-arrow-container" ><i className="fas fa-angle-right"></i></div> : null}
                {this.state.redirect ? <Redirect to={`/app/books/id/${this.state.redirect}`} /> : null}
            </div>
    )
    }
}

export default BookCarousel;