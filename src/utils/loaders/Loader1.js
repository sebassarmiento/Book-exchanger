import React, { Component } from 'react';
import './loader.css';

export default class Loader1 extends Component {
  className(){
    switch(this.props.size){
      case "big":
      return "loader-big"
      case "medium":
      return "loader-medium"
      case "small":
      return "loader-small"
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
