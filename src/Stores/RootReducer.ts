import { combineReducers } from 'redux';
import board from './Board/BoardSlice';
import userStocks from './UserStocks/UserStocksSlice';

const rootReducer = combineReducers({
  board,
  userStocks,
});

export default rootReducer;
