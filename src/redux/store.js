import { createStore } from 'redux';
import rootReducer from './reducers'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());//хранилище

export default store;

//Тут маленькие редюсеры из pizzas и filters соединяю в огромный один редюсер

//store.getState() теперб хранит два редюсера filter, pizzas
