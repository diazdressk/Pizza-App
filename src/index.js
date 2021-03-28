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

