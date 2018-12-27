import React, { Component } from 'react';
import BookPreview from './BookPreview';
import { connect } from 'react-redux';
import './feed-view.css';

class FeedView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log('Here', this.props.token)
    fetch('http://localhost:3000/books/', {
      method: 'GET',
      headers: {
        'authorization': this.props.token
      }
    })
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
          {this.state.data && this.state.data.constructor === Array ? this.state.data.map(book => {
            return (<BookPreview {...book} />)
          }) : <div className="feedview-loader" ><div></div></div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.userData.token
  }
}

export default connect(mapStateToProps)(FeedView);