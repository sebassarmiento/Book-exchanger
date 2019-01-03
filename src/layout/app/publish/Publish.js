import React, { Component } from 'react';
import './publish.css';
import { connect } from 'react-redux';
import ImagePlaceholder from '../../../img/image-placeholder.png';

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
        console.log(this.props.userId)
        this.setState({ publishTry: true })
        fetch('http://localhost:3000/app/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...this.state, username: this.props.username, userId: this.props.userId, date: Date.now() })
        })
            .then(d => d.json())
            .then(res => {
                this.setState({ publishTry: false })
                console.log(res)
                if (res.message === 'Book was added!') {
                    this.setState({ bookAdded: true })
                } else {
                    this.setState({ publishFail: true })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    publishButton() {
        if (this.state.name.length > 1
            &&
            this.state.category.length > 2
            &&
            this.state.place.length > 2
            &&
            this.state.author.length > 3
            &&
            this.state.description.length > 3
        ) {
            return <button onClick={() => this.handlePublish()} className="publish-btn" >{this.state.publishTry ? <div className="publish-loader" ><div></div><div></div><div></div></div> : "Publish"}</button>
        } else {
            return <button className="publish-btn-disabled" >Publish</button>
        }
    }

    render() {
        return (
            <div className="publish-container" >
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
                        <div className="publish-preview" >
                            <div><img height={240} src={this.state.image.length > 5 ? this.state.image : ImagePlaceholder} /></div>
                            <div>
                                <h4>{this.state.name}</h4>
                                <p>{this.state.place}</p>
                                <p>{this.state.author}</p>
                            </div>
                        </div>
                        <div className="publish-preview-description" >{this.state.description}</div>
                    </div>
                </div>
                {this.publishButton()}
                <h2>{this.state.bookAdded ? "Book was added!" : ''}</h2>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        username: store.userData.username,
        userId: store.userData._id
    }
}

export default connect(mapStateToProps)(Publish);