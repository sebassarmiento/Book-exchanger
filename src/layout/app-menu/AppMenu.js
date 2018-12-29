import React, { Component } from 'react';
import './app-menu.css';
import { Link } from 'react-router-dom';

class AppMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: true,
      categories: true,
      settings: true
    }
  }
  render() {
    return (
      <div className="app-menu" >
        <h3><i onClick={() => this.setState({ menu: !this.state.menu })} class="fas fa-bars"></i>Menu</h3>
        <div className={this.state.menu ? "menu-items-open" : "menu-items-closed"} >
          <Link className="menu-item" to="/app/feed" ><i class="fas fa-home"></i><span>Home</span></Link>
          <Link className="menu-item" to="/app/publish" ><i class="fas fa-book"></i><span>Publish book</span></Link>
          <Link className="menu-item" to="/app/profile" ><i class="fas fa-user"></i><span>My Profile</span></Link>
        </div>
        <h3><i onClick={() => this.setState({categories: !this.state.categories})} class="fas fa-ellipsis-h"></i>Categories</h3>
        <div className={this.state.categories ? "categories-items-open" : "categories-items-closed"} >
          <Link to="/app/books/sport" >Sport</Link>
          <Link to="/app/books/clothes" >Clothes</Link>
          <Link to="/app/books/self-improvement" >Self-improvement</Link>
          <Link to="/app/books/money" >Money</Link>
          <Link to="/app/books/success" >Success</Link>
          <Link to="/app/books/motivation" >Motivation</Link>
        </div>
        <h3><i onClick={() => this.setState({settings: !this.state.settings})} class="fas fa-cog"></i>Settings</h3>
        <div className={this.state.settings ? "settings-items-open" : "settings-items-closed"} >
          <Link to="/app/configuration" >Configuration</Link>
          <Link to="/app/configuration" >Configuration</Link>
          <Link to="/app/configuration" >Configuration</Link>
        </div>
      </div>
    )
  }
}

export default AppMenu;