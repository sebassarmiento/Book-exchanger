import React, { Component } from 'react';
import Categories from "./Categories";
import FeedView from './FeedView';
import './feed.css';

const myComponent = props => {
  return <h1>Hello this is {props.name}!</h1>
}

class Feed extends Component {
  render() {
    return (
      <div className="feed-container" >
      <div></div>
      <Categories />
      <FeedView />
      </div>
    )
  }
}

export default Feed;