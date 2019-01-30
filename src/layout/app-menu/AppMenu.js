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
          <Link className="menu-item" to="/app/feed" ><i className="fas fa-home"></i><span>Home</span></Link>
          <a href="#" className="menu-item" onClick={() => this.props.publish()} ><i className="fas fa-plus"></i><span>Publish book</span></a>
          <Link className="menu-item" to="/app/profile" ><i className="fas fa-user"></i><span>My Profile</span></Link>
          <Link className="menu-item" to="#" ><i className="fas fa-bell"></i><span>Notifications</span></Link>
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
    publish: () => dispatch({ type: 'OPEN_PUBLISH_FORM' }),
    closingMenu: () => dispatch({ type: "APP_MENU_CLOSING" }),
    closeMenu: () => dispatch({ type: "APP_MENU_CLOSE" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);