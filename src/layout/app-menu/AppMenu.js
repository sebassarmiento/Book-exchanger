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
    return (
      <div className={`app-menu ${this.props.appMenu.status === 'closing' ? 'app-menu-closed' : null}`} >
        <h1 className="app-menu-title" >Menu</h1>
        <div className="menu-items-open" >
          <Link className="menu-item" to="/app/feed" ><i className="fas fa-home"></i><span>Home</span></Link>
          <a href="#" className="menu-item" onClick={() => this.props.publish()} ><i className="fas fa-book"></i><span>Publish book</span></a>
          <Link className="menu-item" to="/app/profile" ><i className="fas fa-user"></i><span>My Profile</span></Link>
          <Link className="menu-item" to="#" ><i className="fas fa-bell"></i><span>Notifications</span></Link>
        </div>
        <h1 className="app-menu-title" >Your wishlist</h1>
        <div className="wishlist" >
          {this.props.userData.books.liked.map(b => {
            return (<Link className="menu-item" to={`/app/books/id/${b._id}`} ><i className="fas fa-home"></i><span>{b.name}</span></Link>)
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    appMenu: store.appMenu,
    userData: store.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    publish: () => dispatch({ type: 'OPEN_PUBLISH_FORM' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);