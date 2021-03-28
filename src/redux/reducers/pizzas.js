const initialState = {//изначально в массиве нет пицц
  items: [],
  isLoaded: false,//пицц ещё нет,они загружаются с сервера..изначально fakse,там их нет
};

const pizzas = (state = initialState, action) => {//это reducer для редакса
  if (action.type === 'SET_PIZZAS') {//при вызове dispatch если type будет SET_PIZZAS...объект наполняется пиццами
    return {
      ...state,
      items: action.payload,//массив пиц
    };
  }
  return state;//если ничего не меняется,возвращаю пустой массив без пицц
};

export default pizzas;