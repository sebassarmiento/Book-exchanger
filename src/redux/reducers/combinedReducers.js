import * as Actions from '../actions';

const initialStore = {
    footer: true
}

const reducer =  (store = initialStore, actions) => {
    switch(actions.type){
        case Actions.SIGNUP_VIEW:
        return {...store, footer: false, signUp: true}
        case Actions.BACK_TO_HOME:
        return {...store, footer: true, signUp: false}
        case Actions.NEW_USER_SIGNED:
        return {...store, signUp: false, logged: true}
        default:
        return {...store}
    }
}

export default reducer;