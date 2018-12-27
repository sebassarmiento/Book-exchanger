import React, { Component } from 'react';
import './app-menu.css';
import { Link } from 'react-router-dom';

class AppMenu extends Component {
  render() {
    return (
      <div className="app-menu" >
        <div className="menu" >
          <h3>Menu</h3>
          <Link className="menu-item" to="/app/feed" ><i class="fas fa-home"></i><span>Home</span></Link>
          <Link className="menu-item" to="/app/publish" ><i class="fas fa-book"></i><span>Publish book</span></Link>
          <Link className="menu-item" to="/app/profile" ><i class="fas fa-user"></i><span>My Profile</span></Link>          
        </div>
        <div className="app-menu-categories" >
          <h3>Categories</h3>
          <Link to="/app/books/sport" >Sport</Link>
          <Link to="/app/books/clothes" >Clothes</Link>
          <Link to="/app/books/self-improvement" >Self-improvement</Link>
          <Link to="/app/books/money" >Money</Link>
          <Link to="/app/books/success" >Success</Link>
          <Link to="/app/books/motivation" >Motivation</Link>
        </div>
      </div>
    )
  }
}

export default AppMenu;