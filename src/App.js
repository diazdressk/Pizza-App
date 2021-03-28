import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import store from './redux/store';
import { setPizzas as setPizzasAction } from './redux/actions/pizzas';//переименоываю,чтоб путаться
import { Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';

// function App() {
// const [pizzas, setPizzas] = React.useState([]);//useState тут реактовский

//   //fetch
//   // React.useEffect(() => {
//   //   fetch('db.json')
//   //     .then(response => response.json())
//   //     .then(json => {
//   //       setPizzas(json.pizzas);//в pizzas(state) сохраняю массив pizzas
//   //     });

//   // }, []);//рендерится один раз при загрузке

//   //axios
//   React.useEffect(() => {
//     axios.get('db.json')
//       .then(({ data }) => {
//         setPizzas(data.pizzas);
//       })
//   }, []);//рендерится один раз при загрузке

//   return (
//     <div className="wrapper">
//       <Header />
//       <div className="content">
//         <Route path="/" render={() => <Home items={pizzas}/>} exact />
//         {/* render тут,тк передаю компонент,в котором будут элементы и тд */}
//         <Route path="/cart" component={Cart} exact />
//       </div>
//     </div>
//   );
// }



// классовый компонент

class App extends React.Component {
  componentDidMount() {//при первом рендере,по аксиосу иди в сервер и верни пиццы
    axios.get('db.json')
      .then(({ data }) => {
        this.props.setPizzas(data.pizzas);//передаю в редакт объект пиццы, взятый с сервереа, проверяет по type SET_PIZZAS

    })
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Route path="/" render={() => <Home items={this.props.items}/>} exact />
          <Route path="/cart" component={Cart} exact />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {//из этого объекта вытаскиваю пиццы...потом connect объединит всё
  return {
    items: state.pizzas.items
  }
};

const mapDispatchToProps = dispatch => {//беру все actions и превращаю в функции из диспетчей
  return {//в пропсы прокидываю setPizzas, он будет вызывать dispatch
    setPizzas: (items) => dispatch(setPizzasAction(items)),//получает items и при вызове вызовет dispatch и передаст туда объекты
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);//соединяет реакт-редакс..коннект сначала возвращает actions, потом то, что вытаскивает из хранилища...получается мой App теперь будет следить за хранилищем
