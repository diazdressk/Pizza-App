import axios from 'axios';

//получение и сохранение пицц
export const fetchPizzas = () => (dispatch) => {//асинхронный экшн, запрос к серверу, есмли функция, -диспачить,если обычный экшн, не трогать
  axios.get('http://localhost:3001/pizzas')
  .then(({ data }) => {
    dispatch(setPizzas(data));//отправляю data.pizzas в store(хранилище)-редакс,взяв из сервера посредством хука useDispatch()-диспатчера
  });
};

export const setPizzas = (items) => ({//просто сохранение пицц
  type: 'SET_PIZZAS',
  payload: items,
});

