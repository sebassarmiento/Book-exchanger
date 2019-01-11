import React, { Component } from 'react';
import './publish-book.css';
import { connect } from 'react-redux';

class PublishBook extends Component {
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
    handleClick() {
        this.setState({ closed: true })
        setTimeout(() => {
            this.props.closePublish()
        }, 400)
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <div className="publish-book-container" >
                <div onClick={() => this.handleClick()} className={`p-b-background ${this.state.closed ? 'p-b-background-out' : null}`} ></div>
                <div className={`p-b-form ${this.state.closed ? 'p-b-form-closed' : null}`} >
                    <i onClick={() => this.handleClick()} className="fas fa-times"></i>
                    <h2>Publish a new book</h2>
                    <div className="p-b-input" ><input autoComplete="off" required name="name" type="text" /><label htmlFor="name">Name</label></div>
                    <div className="p-b-input" ><input required name="Author" type="text" /><label htmlFor="Author">Author</label></div>
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
                        <div className="p-b-input" ><input autoComplete="off" required name="name" type="text" /><label htmlFor="name">Name</label></div>
                    <div className="p-b-input" ><input autoComplete="off" required name="name" type="text" /><label htmlFor="name">Name</label></div>
                    <div className="p-b-input" ><textarea required ></textarea><label>Description</label></div>
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

export default connect(null, mapDispatchToProps)(PublishBook);
