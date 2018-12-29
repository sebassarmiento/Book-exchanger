import React, { Component } from 'react';
import './publish.css';
import { connect } from 'react-redux';

class Publish extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            category: '',
            place: '',
            image: '',
            author: '',
            description: '',
            pages: 0
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlePublish() {
        fetch('http://localhost:3000/app/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...this.state, username: this.props.username })
        })
            .then(d => d.json())
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="publish-container" >
                <div className="publish-form" >
                    <h1>Publish a book!</h1>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.name} name="name" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.category} name="category" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.place} name="place" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.image} name="image" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.author} name="author" type="text" />
                    <textarea onChange={(e) => this.handleChange(e)} value={this.state.description} name="description" ></textarea>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.pages} name="pages" type="text" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        username: store.userData.username
    }
}

export default connect(mapStateToProps)(Publish);