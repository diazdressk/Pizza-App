import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setCategory } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];//эти данные не буду передавать в редакс,тк они используются только тут,нигде больше не нужны
const sortItems = [
  {name: 'популярности', type: 'popular'}, 
  {name: 'цене', type: 'price'}, 
  {name: 'алфавиту', type: 'alphabet'}
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);//из хранилища вытаскиваю массив пицц
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);//из хранилища вытаскиваю isLoaded
  

  React.useEffect(() => {//при первом рендере отправляю гетЗапрос
    dispatch(fetchPizzas());
  }, []);//рендерится один раз при загрузке



  const onSelectCategory = React.useCallback( index => {//создаю тут и буду передавать просто ссылку на неё,чтобы постоянно не перевызывать
    dispatch(setCategory(index));
  }, []);//мемоизация...только при первом изменении сохранить ссылку,а потом передавать только её,не передавать новые ссылки на функцию,чтобы не произошло обновление

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={onSelectCategory}//при нажатии на какую либо категорию,его индекс отправляю в редакс
                    items={categoryNames}
        />
      <SortPopup items={sortItems}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded ?//мапить и показать пиццы только,если isLoaded true
          items.map(obj =>
          <PizzaBlock key={obj.id} isLoading={true} {...obj}/>)//получаю компонент, объкеты Пицц..ключ id,чтобы реакт по нему мог найти какие именно компоненты изменялись
          : Array(12).fill(<PizzaLoadingBlock />)//иначе скелет(при долгой загрузке пицц из сервера,будут сначала эти прорендерены на страничку,после загрузки пицц,он уйдут)
        }  
      </div>
    </div>
  )
}

export default Home;
