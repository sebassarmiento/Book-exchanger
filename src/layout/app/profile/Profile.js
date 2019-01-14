import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import userPlaceholder from '../../../img/placeholder.user.png';
import { Redirect } from 'react-router-dom';
import LayoutLoader from '../../../utils/loaders/LayoutLoader';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.likedScroll = React.createRef()
        this.publishedScroll = React.createRef()
        this.interval = null
        this.scrollPublished = 0
        this.scrollLiked = 0
    }
    componentDidMount() {
        let url = this.props.location.pathname !== '/app/profile' ? this.props.location.pathname : `/app/user/${this.props.userData._id}`
        fetch(`http://localhost:3000${url}`)
            .then(d => d.json())
            .then(res => {
                console.log('ACA', res)
                this.setState({ data: res })
            })
    }
    handleRedirect(id) {
        this.setState({ redirect: id })
    }
    handleScroll(rightArrow, x){
        let scrolledComponent = x ? this.publishedScroll : this.likedScroll

        let scrollCount = x ? this.scrollPublished : this.scrollLiked

        let maxScroll = scrolledComponent.current.scrollWidth - scrolledComponent.current.clientWidth

        if(rightArrow && scrolledComponent.current.scrollLeft !== maxScroll && !this.interval){
            x ? this.scrollPublished += 400 : this.scrollLiked += 400
            this.interval = setInterval(() => {
                scrolledComponent.current.scrollLeft += 3
                console.log('Se ejecuta', scrollCount, this.scrollPublishedas)
                if(scrolledComponent.current.scrollLeft === maxScroll || scrolledComponent.current.scrollLeft > (x ? this.scrollPublished : this.scrollLiked)){
                    clearInterval(this.interval)
                    this.interval = null
                    console.log('Se para')
                }
            }, 1)
        } else if(!rightArrow && scrolledComponent.current.scrollLeft !== 0 && !this.interval) {
            x ? this.scrollPublished -= 400 : this.scrollLiked -= 400
            this.interval = setInterval(() => {
                scrolledComponent.current.scrollLeft -= 3
                console.log('Se ejecuta', this.scrollPublished)
                if(scrolledComponent.current.scrollLeft === 0 || scrolledComponent.current.scrollLeft < ((x ? this.scrollPublished : this.scrollLiked))){
                    clearInterval(this.interval)
                    this.interval = null
                    console.log('Se para')
                }
            }, 1)
        }
    }
    render() {
        const { data } = this.state
        console.log(data)
        return (
            <div className="profile-container" >
                <div className="p-user-info" >
                    <img alt="user-image" src={data && data.image ? data.image : userPlaceholder} height={200} />
                    <h1>{data ? data.username : null}</h1>
                    <p>{data ? data.age : null} years old</p>
                </div>
                <div className="p-user-books" >
                    <div className="p-user-scroll" >
                        <h4>Published - {data ? data.books.published.length : null}</h4>
                        {data && data.books.published.length > 5 ? <i onClick={() => this.handleScroll(null, 1)} className="fas fa-angle-left"></i> : null}
                        <div ref={this.publishedScroll} className="p-user-books-published" >
                            {data && data.books.published.length > 0 ? data.books.published.map(book => {
                                return (<img src={book.image} className="profile-book-preview" onClick={() => this.handleRedirect(book._id)} />)
                            }) : data ? <p className="no-data" >No books published yet.</p> : <LayoutLoader />}
                        </div>
                        {data && data.books.published.length > 5 ? <i onClick={() => this.handleScroll(1, 1)} className="fas fa-angle-right"></i> : null}
                    </div>
                    <div className="p-user-scroll" >
                        <h4>Liked - {data ? data.books.liked.length : null}</h4>
                        {data && data.books.liked.length > 5 ?<i onClick={() => this.handleScroll()} className="fas fa-angle-left"></i> : null}
                        <div ref={this.likedScroll} className="p-user-books-liked" >
                            {data && data.books.liked.length > 0 ? data.books.liked.map(book => {
                                return (<img src={book.image} className="profile-book-preview" onClick={() => this.handleRedirect(book._id)} />)
                            }) : data ? <p className="no-data" >No books liked yet.</p> : <LayoutLoader />}
                        </div>
                        {data && data.books.liked.length > 5 ? <i onClick={() => this.handleScroll(1)} className="fas fa-angle-right"></i> : null}
                    </div>
                </div>
                {this.state.redirect ? <Redirect to={`/app/books/id/${this.state.redirect}`} /> : null}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        userData: store.userData
    }
}

export default connect(mapStateToProps)(Profile);