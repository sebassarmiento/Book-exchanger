import React, { Component } from 'react';
import './publish-book.css';
import { connect } from 'react-redux';
import BookPlaceholder from '../../img/book-placeholder.jpg';

class PublishBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            category: '',
            location: '',
            image: '//unsplash.it/500/750?random',
            author: '',
            description: '',
            pages: 0
        }
    }
    handleClose() {
        this.setState({ closed: true })
        setTimeout(() => {
            this.props.closePublish()
        }, 400)
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handlePublish() {
        const { state } = this
        if (state.name.length > 0 && state.category.length > 0 && state.location.length > 0 && state.author.length > 0) {
            this.setState({ publishTry: true, cantPublish: false })

            fetch('http://localhost:3000/app/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...this.state, username: this.props.username, userId: this.props.userId, date: Date.now() })
            })
                .then(d => d.json())
                .then(res => {
                    console.log(res)
                    if (res.message === 'Book was added!') {
                        this.handleClose()
                        setTimeout(() => {
                            console.log(res.notification)
                            this.props.notify(res.notification)
                        }, 400)
                    } else {
                        this.handleClose()
                        setTimeout(() => {
                            this.props.notify('error', 'Error publishing book. Try again later.')
                        }, 400)
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            this.setState({ cantPublish: true })
        }
    }
    render() {
        console.log(this.state, this.state.location)
        return (
            <div className="publish-book-container" >
                <div onClick={() => this.handleClose()} className={`p-b-background ${this.state.closed ? 'p-b-background-out' : null}`} ></div>
                <div className={`p-b-form ${this.state.closed ? 'p-b-form-closed' : null}`} >
                    <i onClick={() => this.handleClose()} className="fas fa-times"></i>
                    <h2>Publish a new book</h2>
                    <div className="p-b-grid" >
                        <div className="p-b-input" ><input onChange={(e) => this.handleChange(e)} autoComplete="off" required name="name" type="text" /><label htmlFor="name">Name</label></div>
                        <div className="p-b-input" ><input onChange={(e) => this.handleChange(e)} autoComplete="off" required name="author" type="text" /><label htmlFor="Author">Author</label></div>
                        <div className="p-b-select" >
                            <select name="category" value={this.state.category} onChange={(e) => this.handleChange(e)} >
                                <option value="" disabled defaultValue>Choose a category</option>
                                <option value="Finance">Finance</option>
                                <option value="Technology">Technology</option>
                                <option value="Science">Science</option>
                                <option value="Science-fiction">Science fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Statistics">Statistics</option>
                                <option value="Self-improvement">Self-improvement</option>
                                <option value="Biology">Biology</option>
                                <option value="Maths">Maths</option>
                            </select>
                        </div>
                        <div className="p-b-select" >
                            <select name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} >
                                <option value="" disabled defaultValue>Choose a state</option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="District of Columbia">District Of Columbia</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">Massachusetts</option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New Hampshire">New Hampshire</option>
                                <option value="New Jersey">New Jersey</option>
                                <option value="New Mexico">New Mexico</option>
                                <option value="New York">New York</option>
                                <option value="North Carolina">North Carolina</option>
                                <option value="North Dakota">North Dakota</option>
                                <option value="Ohio">Ohio</option>
                                <option value="Oklahoma">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">Pennsylvania</option>
                                <option value="Rhode Island">Rhode Island</option>
                                <option value="South Carolina">South Carolina</option>
                                <option value="South Dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Washington">Washington</option>
                                <option value="West Virginia">West Virginia</option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
                            </select>
                        </div>
                        <div className="p-b-input" ><input onChange={(e) => this.handleChange(e)} autoComplete="off" required name="pages" type="number" /><label htmlFor="pages">Pages</label></div>
                        <input type="file" />
                        <div className="p-b-image" >
                            <img alt="book-placeholder" src={BookPlaceholder} />
                            {this.state.image ? <p>Image added! <i className="far fa-check-circle"></i></p> : <p>Please add an image.</p>}
                        </div>
                    </div>
                    <div className="p-b-input" ><textarea name="description" onChange={(e) => this.handleChange(e)} required ></textarea><label>Description</label></div>
                    <button onClick={() => this.handlePublish()} className="p-b-btn" >Publish book</button>
                    {this.state.cantPublish ? <p className="p-b-invalid-form" >Please fill out the form <i className="fas fa-exclamation"></i></p> : null}
                    {this.state.publishTry ? <div className="p-b-loader" ><div></div><div>Publishing book...</div></div> : null}
                    {this.state.bookPublished ? <div className="p-b-published" ><i className="far fa-check-circle"></i><div>Book was published!</div></div> : null}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closePublish: () => dispatch({ type: "CLOSE_PUBLISH_FORM" }),
        notify: notification => dispatch({ type: 'NOTIFICATION', payload: notification })
    }
}

const mapStateToProps = store => {
    return {
        username: store.userData.username,
        userId: store.userData._id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishBook);
