import React from 'react';

const Categories = React.memo(function Categories({ items, onClickItem }) {
  const [activeItem, setActiveItem] = React.useState(null);
  //state состояние нужно для отслеживания изменений,изначально он null
  //при изменении activeItem(состояния), происходит setActiveItem(рендеринг) 
  const onSelectItem = (index) => {//функция слежения
    setActiveItem(index);
    onClickItem(index);
    //рендеринг будет происходит после изменения index, он тут Состояние
  }
  return (
    <div className="categories">
      <ul>
        <li className={activeItem === null ? 'active' : ''} onClick={() => onSelectItem(null)}>Все</li>
        {/* изначальное состояние null,и вот в li ВСЕ задается класс active и он красится в черный, тк ему задано 
          значние по умолчанию -null */}
        {items && items.map((name, index) =>//если items не пустой
          <li 
            className={activeItem === index ? 'active' : ''}
            onClick={() => onSelectItem(index) }//сюда не просто передана ссыла функции,а вызвана,тк тут принимает event
            key={name}>
            {name}
          </li>
        )}
      </ul>
    </div>
  )
})

export default Categories

