import React from 'react';
import PropTypes from 'prop-types';

const SortPopup = React.memo(function SortPopup({ items, activeSortType, onClickSortType }) {
  const [visiblePopup, setVisiblePopup ] = React.useState(false);
  //по умолчанию visiblePopup = false; setVisiblePopup -следит за изменением 

  const sortRef = React.useRef();//хранит объект внутри него ссылка на DOM элемент, props, функции и тд подходящим для react способом, в своем свойстве current...всегда хранит актуальное значение на момент вызова функции
  const activeLabel = items.find(obj => obj.type === activeSortType).name;//выбираю свойство имя из активного объекта
  const toggleVisiblePopup = () => {//по производительности лучше создать функцию и отдавать его в компонент,
    //а не вызывать setVisiblePopup в теге...чтобы не пришлось постоянно создавать анонимную функцию там в теге
    //тк такие функции всегда разные
    setVisiblePopup(!visiblePopup);
  };

  const onSelectItem = (index) => {//функция слежения
    if (onClickSortType) {
      onClickSortType(index);
    }
    //рендеринг будет происходит после изменения index, он тут Состояние
    setVisiblePopup(false);//выбралось что то и закрылся список
  }

  const handleOutsideClick = (e) => {
    let path = e.path || (e.composedPath && e.composedPath());//проверяю есть ли в свойстве path ссылка на элемент из sortref.current
    if (!path.includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  };

  React.useEffect(() => {//следит за изменениями///при каждом рендере любого компонента,он увидит и исходя от этого делаю что-либо...ЕСЛИ ПРОИЗОШЕЛ ЭФФЕКТ-ВЫПОЛНИ МОЁ ТЕЛО...а если укажу ЗАВИСИМОСТЬ в не,то он будет следить только за ним, тут у меня зависимость []...это как addEventListener, вызванный на теге []
    document.body.addEventListener('click', handleOutsideClick);//если нажимаю на бади в любом месте,срабатывает функция handleOutsideClick, которая проверяет есть ли в том месте,на который произошел клик элемент,который хранится в sortRef, если элемент этого нет, то visiblePopup сделай false, а значит закроется окошко со списком
  }, []);
  return (
    <div ref={sortRef} className="sort">
       {/* внутри sortRef.current будет храниться ссылка на этот элемент */}
      <div className="sort__label">
        <svg
          className={visiblePopup ? 'rotated' : ''}//маленькая черная фигнюшка переворачивается при открывании
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopup}>{activeLabel}</span>
      </div>
      {visiblePopup && 
        (<div className="sort__popup">
        {/* если visiblePopup = true, показывать список */}
          <ul>
            {items && //если items не пустой
              items.map((obj, index) => (
                <li
                  onClick={() => onSelectItem(obj.type) }
                  className={activeSortType === obj.type ? 'active' : ''}//исходя из объекта
                  key={`${obj.type}_${index}`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>)}
    </div>
  );
});

SortPopup.propTypes = {//"типизация обязательная"
  activeSortType: PropTypes.string.isRequired,//обязательно строка(виды сортировок-попопулярности и тд)
  items: PropTypes.arrayOf(PropTypes.object).isRequired,//только массив из объектов
  onClickSortType: PropTypes.func.isRequired
};

SortPopup.defaultProps = {
  items: []
}

export default SortPopup;
