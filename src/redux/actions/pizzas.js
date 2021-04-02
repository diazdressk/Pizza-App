import axios from 'axios';

export const setLoaded = (payload) => ({
  //передает в редюсер тру или фолс
  type: 'SET_LOADED',
  payload,
});

//получение и сохранение пицц// два вида сортровки
export const fetchPizzas = (sortBy, category) => (dispatch) => {
  //асинхронный экшн, запрос к серверу, есмли функция, -диспачить,если обычный экшн, не трогать
  // console.log(sortBy, category)
  dispatch(setLoaded(false)); //изначально сетЛодед фолс(payload: false)...чтобы и редакс увидел,обязательно диспачу
  axios
    .get(
      `http://localhost:3001/pizzas?${
        category !== null ? `category=${category}` : ''
      }&_sort=${sortBy}&_order=asc`,
    )
    .then(({ data }) => {
      dispatch(setPizzas(data)); //отправляю data.pizzas в store(хранилище)-редакс,взяв из сервера посредством хука useDispatch()-диспатчера
    }); //а тут селлодед станет тру
};

export const setPizzas = (items) => ({
  //просто сохранение пицц
  type: 'SET_PIZZAS',
  payload: items,
});
