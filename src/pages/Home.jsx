import React from 'react'
import { Categories, SortPopup, PizzaBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/actions/filters';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];//эти данные не буду передавать в редакс,тк они используются только тут,нигде больше не нужны
const sortItems = [
  {name: 'популярности', type: 'popular'}, 
  {name: 'цене', type: 'price'}, 
  {name: 'алфавиту', type: 'alphabet'}
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);//из хранилища вытаскиваю массив пицц
  
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
        {items &&//мапить только,если айтемс есть
          items.map(obj => (
          <PizzaBlock key={obj.id} {...obj}/>
          ))//получаю компонент, объкеты Пицц..ключ id,чтобы реакт по нему мог найти какие именно компоненты изменялись
        }
        
      </div>
    </div>
  )
}

export default Home
