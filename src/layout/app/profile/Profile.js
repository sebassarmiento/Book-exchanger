import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import userPlaceholder from '../../../img/placeholder.user.png';
import { Redirect } from 'react-router-dom';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let url = this.props.location.pathname !== '/app/profile' ? this.props.location.pathname : `/app/user/${this.props.userData._id}`
        fetch(`http://localhost:3000${url}`)
        .then(d => d.json())
        .then(res => {
            console.log('ACA',res)
            this.setState({ data: res })
        })
    }
    handleRedirect(id){
        this.setState({redirect: id})
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
                    <h4>Published - {data ? data.books.published.length : null}</h4>
                    <div className="p-user-books-published" >
                        {data && data.books.published.length > 0 ? data.books.published.map(book => {
                            return (<img src={book.image} className="profile-book-preview" onClick={() => this.handleRedirect(book._id)} />)
                        }) : data ? <p className="no-data" >No books published yet.</p> : null}
                    </div>
                    <h4>Liked - {data ? data.books.liked.length : null}</h4>
                    <div className="p-user-books-liked" >
                        {data && data.books.liked.length > 0 ? data.books.liked.map(book => {
                            return (<img src={book.image} className="profile-book-preview" onClick={() => this.handleRedirect(book._id)} />)
                        }) : data ? <p className="no-data" >No books liked yet.</p> : null}
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