import React, { Component } from 'react';
import BookPreview from './BookPreview';

class FeedView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    fetch('http://localhost:3000/books/')
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ data: res })
      })
  }
  render() {
    return (
      <div className="feedview-container" >
        <h1>Latest books</h1>
        <div className="feedview-books" >
          {this.state.data ? this.state.data.map(book => {
            return (<BookPreview {...book} />)
          }) : null}
        </div>
      </div>
    )
  }
}

export default FeedView;