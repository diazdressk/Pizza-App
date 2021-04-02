export const addPizzasToCart = (pizzaObj) =>({
  type: 'ADD_PIZZA_CART',
  payload: pizzaObj,
});

export const clearCart = () =>({//ничего не буду передать,просто действие очищения корзины
  type: 'CLEAR_CART',
});