import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import userPlaceholder from '../../../img/placeholder.user.png';
import { Redirect } from 'react-router-dom';
import LayoutLoader from '../../../utils/loaders/LayoutLoader';
import Chat from '../../../components/chat/BookChat';
import BookCarousel from '../../../components/bookCarousel/BookCarousel';


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
    /*
    handleScroll(rightArrow, x) {
        let scrolledComponent = x ? this.publishedScroll : this.likedScroll

        let scrollCount = x ? this.scrollPublished : this.scrollLiked

        let maxScroll = scrolledComponent.current.scrollWidth - scrolledComponent.current.clientWidth

        if (rightArrow && scrolledComponent.current.scrollLeft !== maxScroll && !this.interval) {
            x ? this.scrollPublished += 400 : this.scrollLiked += 400
            this.interval = setInterval(() => {
                scrolledComponent.current.scrollLeft += 3
                console.log('Se ejecuta', scrollCount, this.scrollPublishedas)
                if (scrolledComponent.current.scrollLeft === maxScroll || scrolledComponent.current.scrollLeft > (x ? this.scrollPublished : this.scrollLiked)) {
                    clearInterval(this.interval)
                    this.interval = null
                    console.log('Se para')
                }
            }, 1)
        } else if (!rightArrow && scrolledComponent.current.scrollLeft !== 0 && !this.interval) {
            x ? this.scrollPublished -= 400 : this.scrollLiked -= 400
            this.interval = setInterval(() => {
                scrolledComponent.current.scrollLeft -= 3
                console.log('Se ejecuta', this.scrollPublished)
                if (scrolledComponent.current.scrollLeft === 0 || scrolledComponent.current.scrollLeft < ((x ? this.scrollPublished : this.scrollLiked))) {
                    clearInterval(this.interval)
                    this.interval = null
                    console.log('Se para')
                }
            }, 1)
        }
    }
    */
    render() {
        const { data } = this.state
        console.log('HEREHERE', data)
        return (
            <div className="profile-container" >
                <div className="p-user-info" >
                    <img alt="user" src={data && data.image ? data.image : userPlaceholder} height={200} />
                    <h1>{data ? data.username : null}</h1>
                    <p><i className="fas fa-map-marker" ></i> {data ? data.location : null}</p>
                    <p>{data ? data.age : null} years old</p>
                    <p>{data ? data.email : null}</p>
                    <p>{data && data.description ? data.description : "No description."}</p>
                </div>
                <div className="p-user-books" >
                    <div className="p-user-scroll" >
                        <BookCarousel books={data && data.books.published ? data.books.published : []} title="Published" />
                    </div>
                    <div className="p-user-scroll" >
                        <BookCarousel books={data && data.books.liked ? data.books.liked : []} title="Liked"  />    
                    </div>
                </div>
                {data && this.props.userData._id !== data._id ? <div className="profile-chat" >
                    <Chat currentUserId={this.props.userData._id} bookOwnerId={data._id} title={`Chat with ${data.username}`} subtitle="You can arrange the exchange of books." />
                </div> : null}
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