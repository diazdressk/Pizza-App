const initialState = {//изначально выбрано по популярности
  category: 0,
  sortBy: "popular",
  
};
const filters = (state = initialState, action) => {//это reducer для редакса
  if (action.type === 'SET_SORT_BY') {//при вызове dispatch если type будет SET_SORT_BY...изменяю объект,состояние...sortBy на новое значение меняю
    return {
      ...state,
      sortBy: action.payload,
    };
  }
  if (action.type === 'SET_CATEGORY') {//при вызове dispatch если type будет SET_CATEGORY...изменяю объект,состояние...category на новое значение меняю
    return {
      ...state,
      category: action.payload,
    };
  }
  
  return state;//если ничего не меняется,возвращаю старое значени
};

export default filters;