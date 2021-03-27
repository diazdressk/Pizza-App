import React, { useState } from 'react'

// class Categories extends React.Component {   классовый компонент
//   state = {
//     activeItem: null
//   }
//   onSelectItem = index => {
//     this.setState({
//       activeItem: index,
//     });//обновляет состояние
//   }

//   render() {
//     const { items, onClickItem } = this.props;
//     return (
//       <div className="categories">
//         <ul>
//           <li>Все</li>
//           {items.map((name, index) =>
//             <li
//               className={this.state.activeItem === index ? 'active' : ''}
//               onClick={() => this.onSelectItem(index) }
//               key={name}>
//               {name}
//             </li>
//           )}
//         </ul>
//       </div>
//     )
//   }
// }


//функциональное
// function Categories({ items, onClickItem }) {
//   const [activeItem, setActiveItem] = React.useState(null);
//   //state состояние нужно для отслеживания изменений
//   //при изменении activeItem(состояния), происходит setActiveItem(рендеринг) 
//   //setActiveItem(index);//ререндеринг будет происходит после изменения index, он тут Состояние
//   //setActiveItem следит за изменением состояния
//   return (
//     <div className="categories">
//       <ul>
//         <li className={activeItem === null ? 'active' : ''} onClick={() => setActiveItem(null)}>Все</li>
//         {items && items.map((name, index) =>//если items не пустой
//           <li 
//             className={activeItem === index ? 'active' : ''}
//             onClick={() => setActiveItem(index) }
//             key={name}>
//             {name}
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }

function Categories({ items }) {
  const [activeItem, setActiveItem] = useState(null);
  //state состояние нужно для отслеживания изменений,изначально он null
  //при изменении activeItem(состояния), происходит setActiveItem(рендеринг) 
  const onSelectItem = (index) => {//функция слежения
    setActiveItem(index);
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
            onClick={() => onSelectItem(index) }
            key={name}>
            {name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Categories

