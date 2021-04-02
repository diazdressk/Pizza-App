import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzasToCart } from '../redux/actions/cart'; //action

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']; //эти данные не буду передавать в редакс,тк они используются только тут,нигде больше не нужны
const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items); //из хранилища вытаскиваю массив пицц
  const cartItems = useSelector(({ cart }) => cart.items); //из корзины беру пиццы
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded); //из хранилища вытаскиваю isLoaded
  const { category, sortBy } = useSelector(({ filters }) => filters); //из хранилища вытаскиваю category и sortBy,чтоб сортировать по ним

  React.useEffect(() => {
    //при первом рендере отправляю гетЗапрос
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]); //рендерится в зависимости category, sortBy,useeffect следит за ними

  const onSelectCategory = React.useCallback((index) => {
    //создаю тут и буду передавать просто ссылку на неё,чтобы постоянно не перевызывать
    dispatch(setCategory(index));
  }, []); //мемоизация...только при первом изменении сохранить ссылку,а потом передавать только её,не передавать новые ссылки на функцию,чтобы не произошло обновление

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const hanndleAddPizzasToCart = (obj) => {
    //при клике Добавить,пицца с выбранными параметрами уйдет в корзину
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory} //при нажатии на какую либо категорию,его индекс отправляю в редакс
          items={categoryNames}
        />
        <SortPopup activeSortType={sortBy} items={sortItems} onClickSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoaded //мапить и показать пиццы только,если isLoaded true
            ? items.map((obj) => (
                <PizzaBlock
                  onClickAddPizza={hanndleAddPizzasToCart}
                  key={obj.id}
                  addedCount={cartItems[obj.id] && cartItems[obj.id].length}
                  {...obj}
                />
              )) //получаю компонент, объкеты Пицц..ключ id,чтобы реакт по нему мог найти какие именно компоненты изменялись
            : Array(12)
                .fill(0)
                .map((_, index) => <PizzaLoadingBlock key={index} />) //иначе скелет(при долгой загрузке пицц из сервера,будут сначала эти прорендерены на страничку,после загрузки пицц,он уйдут)
        }
      </div>
    </div>
  );
}

export default Home;
