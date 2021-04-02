const initialState = {
  items: {}, //
  totalPrice: 0, //полная цена
  totalCount: 0, //полво пицц
};

const getTotalPrice = (arr) => {
  //общая сумма пицц
  return arr.reduce((sum, obj) => obj.price + sum, 0);
};

const cart = (state = initialState, action) => {
  //это reducer для редакса
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      //когда придет action addpizzacart, беру все старое состояние,в свойстве items создаю новой объект,в нем action.payload.id (передаю данные динамически,поэтому [])..в старом айтемс меняю или добавляю данные на новые...можно сделать с библиотеков Inner(глянуть потом!)
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload]; //ЕБАНЫЙ ТЫ ПИЗДЕЦ!!!!!!!!БЛЯЯЯЯЯЯЯ!ПОПРОБОВАТЬ БИБЛИОТЕКУ IMMER...итак: Если в корзине нет пиццы(проверяю по айди), то добавляю его....если есть пицца....к старым данным-пиццы,которые в корзине,которые в редаксе(...state(с помощью спред оператора беру старые данные)) добавляю новые данные-новую пиццу) и сохраняю в карентПиза
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems), //общая стоимость одного вида пицц исходя из количества
        },
      };
      const items = Object.values(newItems).map((obj) => obj.items); //массивы всех пицц,которые в корзине,
      const allPizzas = [].concat.apply([], items); //массив их всех пицц,соединены с помощью apply и флатены
      const totalPrice = getTotalPrice(allPizzas); //общая стоимость всех пицц

      return {
        ...state,
        items: newItems, //создал новый объект и туда стейтАйтемс отдаю,чтобы можно было считать колво и сумму,исходя от него
        totalCount: allPizzas.length, //соединил все объекты в один массив и взял их количество
        totalPrice,
      };
    }
    case 'CLEAR_CART': {
      //очищаю корзину при этом экшне
      return {
        items: {}, //все очищаю
        totalPrice: 0, //полная цена
        totalCount: 0, //колво пицц
      };
    }
    case 'REMOVE_CART_ITEM': {//удаляю одну пиццу,сколько бы его ни было
      const newItems = {
        ...state.items,
      }
      const currentTotalPrice = newItems[action.payload].totalPrice;
      delete newItems[action.payload];//тк неГлубокий объект просто делитом делаю,поверхностно скопировав
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
      };
    }

    default:
      return state; //если ничего не меняется,возвращаю пустой массив без пицц
  }
};

export default cart;
