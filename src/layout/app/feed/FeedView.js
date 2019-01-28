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
    this.getData()
  }
  componentDidUpdate(){
    if(this.state.data && this.state.data.length === this.state.count && this.state.loadMore){
      this.setState({loadMore: false})
    }
  }
  getData(more) {
    if(this.state.data)this.setState({fetching: true})
    if (more) this.count += 10
    fetch(`http://localhost:3000/app/books${this.props.category ? `/category/${this.props.category}` : ''}${this.count > 0 ? `/?search=${this.count}` : ''}`, {
      method: 'GET',
      headers: {
        'authorization': this.props.token
      }
    })
      .then(d => d.json())
      .then(res => {
        this.setState({fetching: false, count: res.count})
        if (this.state.data) {
          this.setState({ data: [...this.state.data, ...res.data]})
        } else {
          this.setState({ data: res.data, loadMore: true })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  queryData(data, query){
    this.setState({ data, query, loadMore: false, count: data ? data.length : null })
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="feedview-container" >
        <BookSearch updateData={(data, query) => this.queryData(data, query)} />
        <div className="feedview-column-2" >
          <StatusBar query={this.state.query} books={this.state.data} count={this.state.count} />
          <div className="feedview-books" >
            {this.state.data && this.state.data.constructor === Array ? this.state.data.map(book => {
              return (<BookPreview {...book} key={book._id} />)
            }) : <LayoutLoader />}
            {this.state.fetching ? <span className="fetching-books" ></span> : null}
            {this.state.loadMore && !this.state.fetching ? <span className="feedview-load-more" ><i className="fas fa-plus" onClick={() => this.getData(1)} ></i></span> : null}
            {this.state.data && this.state.data.length === 0 ? <p className="no-books-to-show" >No books to show.</p> : null}
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