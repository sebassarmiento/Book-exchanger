import React, { Component } from 'react';
import './individual-book.css';
import { NavLink } from 'react-router-dom';

class IndividualBook extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        fetch(`http://localhost:3000${this.props.location.pathname}`)
            .then(d => d.json())
            .then(res => {
                console.log(res)
                this.setState({ data: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className="individual-book" >
                {this.state.data ?
                    <React.Fragment>
                        <div className="individual-book-info" >
                        <img src={this.state.data.image} />
                        <div className="individual-book-data" >
                            <h6>In <NavLink to={`/app/books/${this.state.data.category}`} >{this.state.data.category}</NavLink></h6>
                            <h2>{this.state.data.name}</h2>
                            <span>By {this.state.data.author}</span>
                            <p>Location: {this.state.data.place}</p>
                            <p>Pages: {this.state.data.pages}</p>
                            <div className="individual-book-interact" >
                            <div>
                                <button>I want this book</button>
                                <button>Message the owner</button>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="individual-book-description" >
                        <p>Description:<br />{this.state.data.description}</p>
                        </div>
                    </React.Fragment>
                    :
                    null
                }
            </div>
        )
    }
}

export default IndividualBook;