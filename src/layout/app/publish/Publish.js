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
        this.setState({publishTry: true})
        fetch('http://localhost:3000/app/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...this.state, username: this.props.username, date: Date.now() })
        })
            .then(d => d.json())
            .then(res => {
                this.setState({publishTry: false})
                console.log(res)
                if(res.message === 'Book was added!'){
                    this.setState({bookAdded: true})
                } else {
                    this.setState({publishFail: true})
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    publishButton(){
        if(this.state.name.length > 1 
            &&
           this.state.category.length > 2 
           &&
           this.state.place.length > 2 
           && 
           this.state.author.length > 3 
           && 
           this.state.description.length > 3
           ){
            return <button onClick={() => this.handlePublish()} className="publish-btn" >{this.state.publishTry ? <div className="publish-loader" ><div></div><div></div><div></div></div> : "Publish"}</button>
        } else {
            return <button className="publish-btn-disabled" >Publish</button>
        }
    }

    render() {
        return (
            <div className="publish-container" >
                <h1>Publish a book!</h1>
                <div className="publish-form" >
                    <div>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.name} name="name" placeholder="Name" type="text" />
                        <input onChange={(e) => this.handleChange(e)} value={this.state.category} name="category" placeholder="Category" type="text" />
                        <input onChange={(e) => this.handleChange(e)} value={this.state.place} name="place" placeholder="Location" type="text" />
                        <input onChange={(e) => this.handleChange(e)} value={this.state.image} name="image" placeholder="Image" type="text" />
                        <input onChange={(e) => this.handleChange(e)} value={this.state.author} name="author" placeholder="Author" type="text" />
                        <textarea onChange={(e) => this.handleChange(e)} value={this.state.description} name="description" placeholder="Description" ></textarea>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.pages} name="pages" placeholder="Pages" type="text" />
                    </div>
                    <div>
                        <img height={200} src={this.state.image} />
                        <p>{this.state.description}</p>
                    </div>
                </div>
                {this.publishButton()}
                <h2>dasdasdasdas</h2>
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