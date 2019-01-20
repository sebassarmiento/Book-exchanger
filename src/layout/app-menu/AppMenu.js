import React, { Component } from 'react';
import './app-menu.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AppMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: true
    }
  }
  render() {
    let arrow = <i className="fas fa-caret-right"></i>
    return (
      <div className={`app-menu ${this.props.appMenu.status === 'closing' ? 'app-menu-closed' : null}`} >
        <h3><i onClick={() => this.setState({ menu: !this.state.menu })} className="fas fa-bars"></i>Menu</h3>
        <div className={this.state.menu ? "menu-items-open" : "menu-items-closed"} >
          <Link className="menu-item" to="/app/feed" ><i className="fas fa-home"></i><span>Home</span></Link>
          <a className="menu-item" onClick={() => this.props.publish()} ><i className="fas fa-book"></i><span>Publish book</span></a>
          <Link className="menu-item" to="/app/profile" ><i className="fas fa-user"></i><span>My Profile</span></Link>
        </div>
        <h3><i onClick={() => this.setState({categories: !this.state.categories})} className="fas fa-ellipsis-h"></i>Categories</h3>
        <div className={this.state.categories ? "categories-items-open" : "categories-items-closed"} >
          <Link className="menu-item" to="/app/books/category/sport" >{arrow}<span>Sport</span></Link>
          <Link className="menu-item" to="/app/books/category/clothes" >{arrow}<span>Clothes</span></Link>
          <Link className="menu-item" to="/app/books/category/self-improvement" >{arrow}<span>Self-improvement</span></Link>
          <Link className="menu-item" to="/app/books/category/money" >{arrow}<span>Money</span></Link>
          <Link className="menu-item" to="/app/books/category/success" >{arrow}<span>Success</span></Link>
          <Link className="menu-item" to="/app/books/category/motivation" >{arrow}<span>Motivation</span></Link>
        </div>
        <h3><i onClick={() => this.setState({chat: !this.state.chat})} className="fas fa-comment"></i>Chat</h3>
        <div className={this.state.chat ? "settings-items-open" : "settings-items-closed"} >
          <Link className="menu-item" to="/app/configuration" >Chat 1</Link>
          <Link className="menu-item" to="/app/configuration" >Chat 2</Link>
          <Link className="menu-item" to="/app/configuration" >Chat 3</Link>
        </div>
        <h3><i onClick={() => this.setState({settings: !this.state.settings})} className="fas fa-cog"></i>Settings</h3>
        <div className={this.state.settings ? "settings-items-open" : "settings-items-closed"} >
          <Link className="menu-item" to="/app/configuration" >Configuration</Link>
          <Link className="menu-item" to="/app/configuration" >Configuration</Link>
          <Link className="menu-item" to="/app/configuration" >Configuration</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    appMenu: store.appMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    publish: () => dispatch({ type: 'OPEN_PUBLISH_FORM' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);