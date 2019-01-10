import React, { Component } from 'react';
import './publish-book.css';
import { connect } from 'react-redux';

class PublishBook extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    handleClick() {
        this.setState({closed: true})
        setTimeout(() => {
            this.props.closePublish()
        }, 400)
    }
    render() {
        return (
            <div className="publish-book-container" >
                <div onClick={() => this.handleClick()} className={`p-b-background ${this.state.closed ? 'p-b-background-out' : null}`} ></div>
                <div className={`p-b-form ${this.state.closed ? 'p-b-form-closed' : null}`} >
                    <i onClick={() => this.handleClick()} className="fas fa-times"></i>
                    <h2>Publish a new book</h2>
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
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
