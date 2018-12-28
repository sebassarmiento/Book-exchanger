import React, { Component } from 'react';
import './publish.css';

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
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <div className="publish-container" >
                <h1>Publish a book!</h1>
                <div className="publish-form" >
                    <div><input onChange={(e) => this.handleChange(e)} value={this.state.name} name="name" type="text" /></div>
                    <input onChange={(e) => this.handleChange(e)} value={this.state.category} name="category" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.place} name="place" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.image} name="image" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.author} name="author" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.description} name="description" type="text" />
                    <input onChange={(e) => this.handleChange(e)} value={this.state.pages} name="pages" type="text" />
                </div>
            </div>
        )
    }
}

export default Publish;