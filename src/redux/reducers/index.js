import { combineReducers } from 'redux';
import filters from './filters';
import pizzas from './pizzas';
import cart from './cart';

const rootReducer = combineReducers({//combineReducer объединяет все редюсеры в один
//rootReducer главный один редюсер
  filters,
  pizzas,
  cart,
});

export default rootReducer;