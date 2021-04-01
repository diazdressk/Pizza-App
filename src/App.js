import React from 'react';


import { Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';
// import pizzas from './redux/reducers/pizzas';

// функциональный компонент редакс через хуки 
function App() {//диспачить в редакс изменения
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        {/* render тут,тк передаю компонент,в котором будут элементы и тд */}
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}
export default App;

// const mapStateToProps = state => {//из этого объекта вытаскиваю пиццы...потом connect объединит всё и отдает в пропс
//   return {
//     items: state.pizzas.items
//   }
// };

// const mapDispatchToProps = dispatch => {//беру все actions и превращаю в функции из диспетчей
//   return {//в пропсы прокидываю setPizzas, он будет вызывать dispatch
//     setPizzas: (items) => dispatch(setPizzasAction(items)),//получает items и при вызове вызовет dispatch и передаст туда объекты
//   }//завовывает в пропсы именно какого то компонента action creators без диспатчей,как обычные функции
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);//соединяет реакт-редакс..коннект сначала возвращает actions, потом то, что вытаскивает из хранилища...получается мой App теперь будет следить за хранилищем

