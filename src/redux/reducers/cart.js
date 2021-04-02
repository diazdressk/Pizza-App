const initialState = {
  items: {}, //
  totalPrice: 0, //полная цена
  totalCount: 0, //полво пицц
};

const cart = (state = initialState, action) => {
  //это reducer для редакса
  switch (action.type) {
    case 'ADD_PIZZA_CART': { //когда придет action addpizzacart, беру все старое состояние,в свойстве items создаю новой объект,в нем action.payload.id (передаю данные динамически,поэтому [])..в старом айтемс меняю или добавляю данные на новые...можно сделать с библиотеков Inner(глянуть потом!)
      const newItems = {
        //ЕБАНЫЙ ТЫ ПИЗДЕЦ!!!!!!!!БЛЯЯЯЯЯЯЯ!ПОПРОБОВАТЬ БИБЛИОТЕКУ INNER...итак: Если в корзине нет пиццы(проверяю по айди, то добавляю его....если есть пицца....к старым данным-пиццы,которые в корзине,которые в редаксе(...state(с помощью спред оператора беру старые данные)) добавляю новые данные-новую пиццу)
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };
      const pizzasOnCart = [].concat.apply([], Object.values(newItems));//массив их всех пицц,которые в корзине
      return {
        ...state,
        items: newItems,//создал новый объект и туда стейтАйтемс отдаю,чтобы можно было считать колво и сумму,исходя от него
        totalCount: pizzasOnCart.length,//соединил все объекты в один массив и взял их количество
        totalPrice: pizzasOnCart.reduce((sum, obj) => obj.price + sum, 0),
      };
    }

    default:
      return state; //если ничего не меняется,возвращаю пустой массив без пицц
  }
};

export default cart;
