import { combineReducers } from 'redux';
import filterReducer from './filters';
import pizzasReducer from './pizzas';

const rootReducer = combineReducers({//combineReducer объединяет все редюсеры в один
//rootReducer главный один редюсер
  filters: filterReducer,
  pizzas: pizzasReducer,
});

export default rootReducer;