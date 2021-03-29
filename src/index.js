import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './scss/app.scss';
import App from './App';
// import Header from './components/Header';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* провайдер передает стор из редакса в реакт...и теперь App видит,что есть редакс,в нем есть хранилище с данными */}
        {/* провайдер говорит,что в редаксе есть store,в котором данные,главный редюсер,который работает с ними и тд */}
        <App />
        {/* <Route exact path='/' component={App} />
        <Route exact path='/header' component={Header} /> */}
        {/* в pizza.com/header будет рендериться только Header */}
        {/* exact если строго указан путь вместе с / */}
      </Provider>
    </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

