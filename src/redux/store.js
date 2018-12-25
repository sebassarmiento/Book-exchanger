import { createStore } from 'redux';
import Reducers from '../redux/reducers/combinedReducers';

const store = createStore(Reducers)

store.subscribe(() => console.log(store.getState()))

export default store;