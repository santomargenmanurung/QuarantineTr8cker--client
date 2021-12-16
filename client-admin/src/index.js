import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store/index'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/**
 * Combine dengan history yg lama, apa aja yg perlu dimasukin?suchas awarding & organization? dari tahun berapa
 * details worknya perlu?
 */