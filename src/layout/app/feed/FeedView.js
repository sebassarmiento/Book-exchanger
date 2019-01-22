import React, { Component } from 'react';
import BookPreview from './book-preview/BookPreview';
import { connect } from 'react-redux';
import './feed-view.css';
import LayoutLoader from '../../../utils/loaders/LayoutLoader';
import BookSearch from './book-search/BookSearch';
import StatusBar from './status-bar/StatusBar';

class FeedView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.count = 0
    this.location = this.props.location.pathname
  }
  componentDidMount() {
    console.log('ACAAAAAAAAA', this.props.match.params)
    this.getData()
  }
  getData(more) {
    if (more) this.count += 10
    fetch(`http://localhost:3000/app/books${this.props.category ? `/category/${this.props.category}` : ''}${this.count > 0 ? `/?search=${this.count}` : ''}`, {
      method: 'GET',
      headers: {
        'authorization': this.props.token
      }
    })
      .then(d => d.json())
      .then(res => {
        console.log(res)
        if (this.state.data) {
          this.setState({ data: [...this.state.data, ...res] })
        } else {
          this.setState({ data: res, loadMore: true })
        }
        if (res.length < 10) {
          this.setState({ loadMore: false })
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
        <BookSearch />
        <div className="feedview-column-2" >
          <StatusBar />
          <div className="feedview-books" >
            {this.state.data && this.state.data.constructor === Array ? this.state.data.map(book => {
              return (<BookPreview {...book} key={book._id} />)
            }) : <LayoutLoader />}
            {this.state.loadMore ? <p className="feedview-load-more" onClick={() => this.getData(1)} >Load more</p> : null}
          </div>
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