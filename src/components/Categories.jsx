import React from 'react';
import PropTypes from 'prop-types';


const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategory(null)}>Все</li>
        {/* изначальное состояние null,и вот в li ВСЕ задается класс active и он красится в черный, тк ему задано 
          значние по умолчанию -null */}
        {items && items.map((name, index) =>//если items не пустой
          <li 
            className={activeCategory === index ? 'active' : ''}
            onClick={() => onClickCategory(index) }//сюда не просто передана ссыла функции,а вызвана,тк тут принимает event
            key={name}>
            {name}
          </li>
        )}
      </ul>
    </div>
  )
});

Categories.propTypes = {
  activeCategory: PropTypes.oneOf([PropTypes.number, null]),//либо числа,либо нал
  items: PropTypes.arrayOf(PropTypes.string).isRequired,//только массив из строк('Мясные', 'Вегетарианская' и тд)
  onClickCategory: PropTypes.func.isRequired
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;

