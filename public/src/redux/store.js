// import { createStore } from 'redux';
// import rootReducer from './reducers'
// import thunk from 'redux-thunk';

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());//хранилище

// export default store;

// //Тут маленькие редюсеры из pizzas и filters соединяю в огромный один редюсер

// //store.getState() теперб хранит два редюсера filter, pizzas




import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//это чтобы подключить два наблюдателя за экшнами- reactdevtools и thunk

const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk))
);//хранилище

export default store;