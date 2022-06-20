import { combineReducers } from 'redux';
import board from './Board/BoardSlice';

const rootReducer = combineReducers({
  board,
});

export default rootReducer;
