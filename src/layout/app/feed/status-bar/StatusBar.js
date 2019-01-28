import React, { Component } from 'react';
import './status-bar.css';

class StatusBar extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  text(){
    if(this.props.books){
      if(this.props.query){
        if(this.props.books.length === 0){
          return `No results for ${this.props.query}`
        } else {
          return `${this.props.count} Results for '${this.props.query}'`
        }
  
      } else {
        return `Showing ${this.props.books.length} of ${this.props.count}`
      }
    }
  }
  render() {
    console.log('MIS PROPS JAJA', this.props)
    return (
      <div className="status-bar" >
        <p>{this.text()}</p>
        <div>
          <label>Sort by </label>
          <select>
            <option>Date</option>
            <option>Ratings</option>
            <option>User</option>
          </select>
        </div>
      </div>
    )
  }
}

export default StatusBar;