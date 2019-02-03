import * as Actions from '../actions';

const initialStore = {
    footer: true,
    appMenu: {
        status: 'closed'
    },
    newUser: true
}

const reducer =  (store = initialStore, action) => {
    switch(action.type){
        case Actions.SIGNUP_VIEW:
        return {...store, footer: false, signUp: true}
        case Actions.LOGIN_VIEW:
        return {...store, footer: false, login: true}
        case Actions.LOGIN_SUCCESS:
        return {...store, userData: {...action.payload} , signUp: false, login: false ,logged: true}
        case Actions.BACK_TO_HOME:
        return {...store, footer: true, signUp: false, login: false}
        case Actions.NEW_USER_SIGNED:
        return {...store, userData: {...action.payload}, signUp: false, logged: true, newUser: true}
        case Actions.CLOSE_USER_WELCOME:
        return {...store, newUser: false}
        case Actions.CHAT_CREATED:
        return {...store, userData: {...store.userData, chats: [...store.userData.chats, action.payload ]}}
        case Actions.ADD_BOOK_TO_WISHLIST_IN_STORE:
        return {...store, userData: {...store.userData, books: action.payload} }
        case Actions.CLOSE_PUBLISH_FORM:
        return {...store, publish: false}
        case Actions.OPEN_PUBLISH_FORM:
        return {...store, publish: true}
        case Actions.NOTIFICATION:
        let notification = {...action.payload}
        return {
            ...store, 
            userData: {...store.userData, notifications: [...store.userData.notifications, notification]},
            notification }
        case Actions.NOTIFICATION_CLOSE:
        return {...store, notification: null}
        case Actions.OPEN_NOTIFICATIONS_VIEW:
        return {...store, notificationsView: true}
        case Actions.CLOSE_NOTIFICATIONS_VIEW:
        let notifications = store.userData.notifications.map(n => { return {...n, opened: true} })
        return {...store, notificationsView: false, userData: {...store.userData, notifications }}
        case Actions.APP_MENU_OPEN:
        return {...store, appMenu: {...store.appMenu, status: 'open'}}
        case Actions.APP_MENU_CLOSING:
        return {...store, appMenu: {...store.appMenu, status: 'closing'} }
        case Actions.APP_MENU_CLOSE:
        return {...store, appMenu: {...store.appMenu, status: 'closed'}}
        case Actions.LOGOUT:
        return {...initialStore}
        default:
        return {...store}
    }
}

export default reducer;