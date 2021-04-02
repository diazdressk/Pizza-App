export const addPizzasToCart = (pizzaObj) =>({
  type: 'ADD_PIZZA_CART',
  payload: pizzaObj,
});

export const clearCart = () =>({//ничего не буду передать,просто действие очищения корзины
  type: 'CLEAR_CART',
});

export const removeCartItem = (id) =>({//удаляю какую-либо пиццу ВСЮ,нахожу по айди
  type: 'REMOVE_CART_ITEM',
  payload: id,
});

export const plusCartItem = (id) =>({//увеличиваю колво пицц в корзине
  type: 'PLUS_CART_ITEM',
  payload: id,
});

export const minusCartItem = (id) =>({//уменьашаю колво пицц в корзине
  type: 'MINUS_CART_ITEM',
  payload: id,
});