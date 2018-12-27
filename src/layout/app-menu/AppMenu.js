import React, { Component } from 'react';
import './app-menu.css';

class AppMenu extends Component {
  render() {
    return (
      <div className="app-menu" >
        <h1>Categories</h1>
        <p>Sport</p>
        <p>Clothes</p>
        <p>Self-improvement</p>
        <p>Money</p>
        <p>Success</p>
        <p>Motivation</p>
      </div>
    )
  }
}

export default AppMenu;