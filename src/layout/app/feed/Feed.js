import React, { Component } from 'react';
import AppMenu from "./AppMenu";
import FeedView from './FeedView';
import './feed.css';

class Feed extends Component {
  render() {
    return (
      <div className="feed-container" >
      <AppMenu />
      <FeedView />
      </div>
    )
  }
}

export default Feed;