import React, { Component } from 'react';
import './input.css';

export default class Input extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div className="input-container" >
        <input name={this.props.label.toLowerCase()} onChange={(e) => this.props.handleChange(e)} value={this.props.value} autoComplete="off" required type={this.props.type} />
        <label>{this.props.label}</label>
      </div>
    )
  }
}
