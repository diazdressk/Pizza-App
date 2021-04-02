const initialState = {
  items: {}, //
  totalPrice: 0, //полная цена
  totalCount: 0, //полво пицц
};

const getTotalPrice = (arr) => {
  //общая сумма пицц
  return arr.reduce((sum, obj) => obj.price + sum, 0);
};
const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
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
      // const totalCount = Object.keys(newItems).reduce(
      //   (sum, key) => newItems[key].items.length + sum,
      //   0,
      // );
      // const totalPrice = Object.keys(newItems).reduce(
      //   (sum, key) => newItems[key].totalPrice + sum,
      //   0,
      // );
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      // const items = Object.values(newItems).map((obj) => obj.items); //массивы всех пицц,которые в корзине,
      // const allPizzas = [].concat.apply([], items); //массив их всех пицц,соединены с помощью apply и флатены
      // const totalPrice = getTotalPrice(allPizzas); //общая стоимость всех пицц

      return {
        ...state,
        items: newItems, //создал новый объект и туда стейтАйтемс отдаю,чтобы можно было считать колво и сумму,исходя от него
        totalCount, //соединил все объекты в один массив и взял их количество
        totalPrice,
      };
    }
    
    case 'REMOVE_CART_ITEM': {
      //удаляю одну пиццу,сколько бы его ни было
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice; //сумма ицц,которые удалю
      const currentTotalCount = newItems[action.payload].items.length; //колво пицц,которые удалю
      delete newItems[action.payload]; //тк неГлубокий объект просто делитом делаю,поверхностно скопировав
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice, //из всей суммы отнимаю сумму удаленных пицц
        totalCount: state.totalCount - currentTotalCount, //из всех пицц отнимаю колво удаленных пицц
      };
    }
    case 'PLUS_CART_ITEM': {
      const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
      
      
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      return {
        ...state,
        items: newItems,
        totalCount,
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

    default:
      return state; //если ничего не меняется,возвращаю пустой массив без пицц
  }
};

export default cart;
