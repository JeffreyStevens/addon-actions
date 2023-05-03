import {combineReducers} from 'redux';
import pageReducer from './page/pageSlice';

const rootReducer = combineReducers({
    page: pageReducer,
});

export default rootReducer;
