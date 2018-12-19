import * as Actions from '../actions';

const initialStore = {
    footer: true
}

const reducer =  (store = initialStore, actions) => {
    switch(actions.type){
        case Actions.SIGNUP_VIEW:
        return {...store, footer: false}
        default:
        return {...store}
    }
}

export default reducer;