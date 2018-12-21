import React, { Component } from 'react';
import './loader.css';

export default class Loader1 extends Component {
  constructor(props){
    super(props)
  }
  className(){
    switch(this.props.size){
      case "big":
      return "loader-big"
      break;
      case "medium":
      return "loader-medium"
      break;
      case "small":
      return "loader-small"
      break;
      default:
      return "loader-medium"
    }
  }
  render() {
    return (
      <span className={this.className()} >
      </span>
    )
  }
}
