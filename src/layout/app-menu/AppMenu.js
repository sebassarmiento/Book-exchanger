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
        <h1 className="app-menu-title" >Menu</h1>
        <div className="menu-items-open" >
          <Link className="menu-item" to="/app/feed" ><i className="fas fa-home"></i><span>Home</span></Link>
          <a href="#" className="menu-item" onClick={() => this.props.publish()} ><i className="fas fa-book"></i><span>Publish book</span></a>
          <Link className="menu-item" to="/app/profile" ><i className="fas fa-user"></i><span>My Profile</span></Link>
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