import React, { Component } from 'react';
import Categories from "./Categories";
import FeedView from './FeedView';
import './feed.css';

class Feed extends Component {
  render() {
    return (
      <div className="feed-container" >
      <Categories />
      <FeedView />
      </div>
    )
  }
}

export default Feed;