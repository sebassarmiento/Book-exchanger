import React, { Component } from 'react';
import BookPreview from './BookPreview';
import { connect } from 'react-redux';
import './feed-view.css';

class FeedView extends Component {
  constructor(props) {
    super(props)
    this.state = {loadMore: true}
    this.count = 0
  }
  componentDidMount() {
    this.getData()
  }
  getData(more){
    if(more)this.count += 10
    fetch(`http://localhost:3000/app/books${this.count > 0 ? `/?search=${this.count}` : ''}`, {
      method: 'GET',
      headers: {
        'authorization': this.props.token
      }
    })
      .then(d => d.json())
      .then(res => {
        console.log(res)
        if(this.state.data){
          this.setState({data: [...this.state.data, ...res]})
        } else {
          this.setState({data: res})
        }
        if(res.length < 10){
          this.setState({loadMore: false})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="feedview-container" >
        <h1>Latest books</h1>
        <div className="feedview-books" >
          {this.state.data && this.state.data.constructor === Array ? this.state.data.map(book => {
            return (<BookPreview {...book} key={book._id} />)
          }) : <div className="feedview-loader" ><div></div></div>}
        </div>
        {this.state.loadMore ? <p className="feedview-load-more" onClick={() => this.getData(1)} >Load more</p> : null}
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