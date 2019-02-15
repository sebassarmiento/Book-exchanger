import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import userPlaceholder from '../../../img/placeholder.user.png';
import { Redirect } from 'react-router-dom';
import Chat from '../../../components/chat/BookChat';
import BookCarousel from '../../../components/bookCarousel/BookCarousel';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this.props.loaderOn()
        this.getData()
    }
    getData(){
        let url = this.props.location.pathname !== '/app/profile' ? this.props.location.pathname : `/app/user/${this.props.userData._id}`
        fetch(`https://bookexchangerapi.herokuapp.com${url}`)
            .then(d => d.json())
            .then(res => {
                console.log('ACA', res)
                this.setState({ data: res })
                this.props.loaderOff()
            })
            .catch(err => {
                console.log(err)
                this.props.loaderOff()
            })
    }
    handleRedirect(id) {
        this.setState({ redirect: id })
    }
    render() {
        const { data } = this.state
        console.log('HEREHERE', data)
        return (
            <div className="profile-container" >
                <div className="p-user-info" >
                    <img alt="user" src={data && data.image ? data.image : userPlaceholder} height={200} />
                    <h1>{data ? data.username : null}</h1>
                    <p><i className="fas fa-map-marker" ></i> {data ? data.location : null}</p>
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

const mapDispatchToProps = dispatch => {
    return {
        loaderOn: () => dispatch({ type: "MAIN_LOADER_ON" }),
        loaderOff: () => dispatch({ type: "MAIN_LOADER_OFF" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);