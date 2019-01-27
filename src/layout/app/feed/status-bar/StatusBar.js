import React, { Component } from 'react';
import './status-bar.css';

class StatusBar extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    console.log('MIS PROPS JAJA', this.props)
    return (
      <div className="status-bar" >
        
      </div>
    )
  }
}

export default StatusBar;