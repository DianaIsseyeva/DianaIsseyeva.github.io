import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import './index.css';
import App from './containers/App';
import reducer from "./store/reducer";
import reportWebVitals from './reportWebVitals';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
