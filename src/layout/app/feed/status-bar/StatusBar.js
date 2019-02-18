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
          return (<p>No results for '<strong>{this.props.query}'</strong></p>)
        } else {
          return (<p>Showing {this.props.books.length} results for '<strong>{this.props.query}</strong>'</p>)
        }
  
      } else {
        return `Showing ${this.props.books.length} of ${this.props.count} books`
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
            <option value="new" >From new to old</option>
            <option value="old" >From old to new</option>
            <option value="more" >More ratings</option>
            <option value="less" >Less ratings</option>
          </select>
        </div>
      </div>
    )
  }
}

export default StatusBar;