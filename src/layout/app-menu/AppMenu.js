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
  openPublish(){
    this.props.openPublish()
    this.handleClose()
  }
  openNotification(){
    this.props.openNotificationsView()
    this.handleClose()
  }
  handleClose(){
    this.props.closingMenu()
    this.setState({closing: true})
    setTimeout(() => {
      this.props.closeMenu()
    }, 500)
  }
  render() {
    return (
      <React.Fragment>
      <div className={`app-menu ${this.props.appMenu.status === 'closing' ? 'app-menu-closed' : ''}`} >
        <h1 className="app-menu-title" >Menu</h1>
        <div className="menu-items-open" >
          <Link onClick={() => this.handleClose()} className="menu-item" to="/app/feed" ><i className="fas fa-home"></i><span>Home</span></Link>
          <a onClick={() => this.openPublish()} href="#!" className="menu-item" ><i className="fas fa-plus"></i><span>Publish book</span></a>
          <Link onClick={() => this.handleClose()} className="menu-item" to="/app/profile" ><i className="fas fa-user"></i><span>My Profile</span></Link>
          <Link onClick={() => this.openNotification()} className="menu-item" to="#" ><i className="fas fa-bell"></i><span>Notifications</span></Link>
        </div>
        <h1 className="app-menu-title" >Your wishlist <span>({this.props.userData.books.liked.length})</span></h1>
        <div className="wishlist" >
          {this.props.userData.books.liked.length > 0 ? this.props.userData.books.liked.map(b => {
            return (<Link className="menu-item" to={`/app/books/id/${b._id}`} ><i className="fas fa-book"></i><span>{b.name}</span></Link>)
          }) : <p className="empty-wishlist" >You have no books on your wishlist.</p>}
        </div>
      </div>
      <div onClick={() => this.handleClose()} className={`app-menu-bg ${this.props.appMenu.status === 'closing' ? 'app-menu-bg-closed' : ''}`} ></div>
      </React.Fragment>
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
    openPublish: () => dispatch({ type: 'OPEN_PUBLISH_FORM' }),
    openNotificationsView: () => dispatch({ type: 'OPEN_NOTIFICATIONS_VIEW' }),
    closingMenu: () => dispatch({ type: "APP_MENU_CLOSING" }),
    closeMenu: () => dispatch({ type: "APP_MENU_CLOSE" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);