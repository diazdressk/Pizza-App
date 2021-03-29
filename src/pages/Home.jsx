import React from 'react'
import { Categories, SortPopup, PizzaBlock } from '../components';
function Home({ items }) {

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={name => console.log(name)} items={[
          'Мясные',
          'Вегетарианская',
          'Гриль',
          'Острые',
          'Закрытые',
        ]}/>
      <SortPopup items={[
        {name: 'популярности', type: 'popular'}, 
        {name: 'цене', type: 'price'}, 
        {name: 'алфавиту', type: 'alphabet'}
      ]}/>
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
