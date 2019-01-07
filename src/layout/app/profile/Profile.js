import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import userPlaceholder from '../../../img/placeholder.user.png';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this.setState({data: this.props.userData})
    }
    render() {
        const { data } = this.state
        console.log(data)
        return (
            <div className="profile-container" >
                <div className="p-user-info" >
                    <img alt="user-image" src={data && data.image ? data.image : userPlaceholder} height={200} />
                    <h1>{data ? data.username : null}</h1>
                    <p><strong>Age: </strong>{data ? data.age : null}</p>
                    <p><strong>Location: </strong>{data ? data.location : null}</p>
                    <p><strong>Books Published: </strong>{data ? data.books.length : null}</p>
                </div>
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