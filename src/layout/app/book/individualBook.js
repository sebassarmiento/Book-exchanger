import React, { Component } from 'react';
import './individual-book.css';
import { NavLink } from 'react-router-dom';
import timeAgo from '../../../utils/TimeAgo';

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
                        <h5><NavLink to="/app/feed" >Books </NavLink>> <NavLink to={`/app/books/${this.state.data.category.toLowerCase()}`} >{this.state.data.category}</NavLink></h5>
                        <div className="individual-book-info" >
                            <img src={this.state.data.image} />
                            <div>
                                <h6>In <NavLink to={`/app/books/${this.state.data.category.toLowerCase()}`} >{this.state.data.category}</NavLink></h6>
                                <h2>{this.state.data.name}</h2>
                                <div className="i-b-data" >
                                    <div>
                                        <p>By {this.state.data.author}</p>
                                        <p>{timeAgo(this.state.data.date)} ago</p>
                                        <p><strong>Location: </strong>{this.state.data.place}</p>
                                        <p><strong>Pages: </strong>{this.state.data.pages}</p>
                                        <p><strong>Owner: </strong><NavLink to={`/app/user/${this.state.data.userId}`} >{this.state.data.username}</NavLink></p>
                                    </div>
                                    <div className="i-b-interact" >
                                        <div>
                                            <button>I want this book</button>
                                            <button>Message the owner</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="individual-book-description" >
                            <p>{this.state.data.description}</p>
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