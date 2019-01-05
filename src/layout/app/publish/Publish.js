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
                    this.setState({
                        bookAdded: true,
                        name: '',
                        category: '',
                        place: '',
                        image: '',
                        author: '',
                        description: '',
                        pages: 0
                    })
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
            this.state.category.length > 1
            &&
            this.state.place.length > 1
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
        console.log(this.state)
        return (
            <div className="publish-container" >
                <div className="publish-form" >
                    <div>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.name} name="name" placeholder="Name" type="text" />
                        <div>
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
                        <input onChange={(e) => this.handleChange(e)} value={this.state.image} name="image" placeholder="Image" type="text" />
                        <input onChange={(e) => this.handleChange(e)} value={this.state.author} name="author" placeholder="Author" type="text" />
                        <textarea onChange={(e) => this.handleChange(e)} value={this.state.description} name="description" placeholder="Description" ></textarea>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.pages} name="pages" placeholder="Pages" type="text" />
                    </div>
                    <div>
                        <div className="publish-preview" >
                            <div><img height={240} alt="book-preview" src={this.state.image.length > 5 ? this.state.image : ImagePlaceholder} /></div>
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