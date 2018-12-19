import { createStore } from 'redux';
import Reducers from '../redux/reducers/combinedReducers';

const store = createStore(Reducers)

export default store;