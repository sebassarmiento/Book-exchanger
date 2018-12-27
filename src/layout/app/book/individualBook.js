import React, { Component } from 'react';
import './individual-book.css';

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
                <h1>IndividualBook</h1>
                {this.state.data ?
                    <div className="individual-book-info" >
                        <img src={this.state.data.image} />
                        <div className="individual-book-data" >
                            <h2>{this.state.data.name}</h2>
                            <span>By {this.state.data.author || "Peter Mckinsey"}</span>
                            <p>Category: {this.state.data.category}</p>
                            <p>Description: {this.state.data.description}</p>
                            <p>Location: {this.state.data.place}</p>
                            <p>Pages: {this.state.data.pages}</p>
                        </div>
                        <div className="individual-book-interact" >
                            <div>
                                <button>I want this book</button>
                                <button>Message the owner</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default IndividualBook;