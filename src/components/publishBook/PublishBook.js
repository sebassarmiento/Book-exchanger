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
            place: '',
            image: '//unsplash.it/500/750?random',
            author: '',
            description: '',
            pages: 0
        }
    }
    handleClick() {
        this.setState({ closed: true })
        setTimeout(() => {
            this.props.closePublish()
        }, 400)
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handlePublish(){
        const { state } = this
        if(state.name.length > 0 && state.category.length > 0 && state.place.length > 0 && state.author.length > 0){
            this.setState({publishTry: true, cantPublish: false})
            
            fetch('http://localhost:3000/app/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...this.state, username: this.props.username, userId: this.props.userId, date: Date.now() })
            })
            .then(d => d.json())
            .then(res => {
                console.log(res)
                if(res.message === 'Book was added!'){
                    this.setState({bookPublished: true})
                    setTimeout(() => {
                        this.props.closePublish()
                    }, 1000)
                }
            })
            .catch(err => {
                console.log(err)
            })

        } else {
            this.setState({cantPublish: true})
        }
    }
    render() {
        console.log(this.state)
        return (
            <div className="publish-book-container" >
                <div onClick={() => this.handleClick()} className={`p-b-background ${this.state.closed ? 'p-b-background-out' : null}`} ></div>
                <div className={`p-b-form ${this.state.closed ? 'p-b-form-closed' : null}`} >
                    <i onClick={() => this.handleClick()} className="fas fa-times"></i>
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
                            <select name="place" value={this.state.place} onChange={(e) => this.handleChange(e)} >
                                <option value="" disabled defaultValue>Choose a state</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
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
        closePublish: () => dispatch({ type: "CLOSE_PUBLISH_FORM" })
    }
}

const mapStateToProps = store => {
    return {
        username: store.userData.username,
        userId: store.userData._id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishBook);
