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
          return `No results for '${this.props.query}'`
        } else {
          return `${this.props.count} Results for '${this.props.query}'`
        }
  
      } else {
        return `Showing ${this.props.books.length} of ${this.props.count}`
      }
    }
  }
  handleChange(e){
    this.props.sort(e.target.value)
  }
  render() {
    return (
      <div className="status-bar" >
        <p>{this.text()}</p>
        <div>
          <label>Sort by </label>
          <select onChange={(e) => this.handleChange(e)} >
            <option value="old" >From old to new</option>
            <option value="new" >From new to old</option>
            <option value="more" >More ratings</option>
            <option value="less" >Less ratings</option>
          </select>
        </div>
      </div>
    )
  }
}

export default StatusBar;