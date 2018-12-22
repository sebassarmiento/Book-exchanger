import * as Actions from '../actions';

const initialStore = {
    footer: true
}

const reducer =  (store = initialStore, actions) => {
    switch(actions.type){
        case Actions.SIGNUP_VIEW:
        return {...store, footer: false, signUp: true}
        case Actions.LOGIN_VIEW:
        return {...store, footer: false, login: true}
        case Actions.LOGIN_SUCCESS:
        return {...store, signUp: false, login: false ,logged: true}
        case Actions.BACK_TO_HOME:
        return {...store, footer: true, signUp: false, login: false}
        case Actions.NEW_USER_SIGNED:
        return {...store, signUp: false, logged: true}
        default:
        return {...store}
    }
}

export default reducer;