import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';

function App() {
  const [pizzas, setPizzas] = React.useState([])

  //fetch
  // React.useEffect(() => {
  //   fetch('db.json')
  //     .then(response => response.json())
  //     .then(json => {
  //       setPizzas(json.pizzas);//в pizzas(state) сохраняю массив pizzas
  //     });

  // }, []);//рендерится один раз при загрузке

  //axios
  React.useEffect(() => {
    axios.get('db.json')
      .then(({ data }) => {
        setPizzas(data.pizzas);
      })
  }, []);//рендерится один раз при загрузке

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" render={() => <Home items={pizzas}/>} exact />
        {/* render тут,тк передаю компонент,в котором будут элементы и тд */}
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}

export default App;
