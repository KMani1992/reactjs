import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'

import { combineReducers, createStore } from 'redux';
import userReducer from './user-reducer';
import productReducer from './product-reducer';



const allReducer = combineReducers({
  products: productReducer,
  user: userReducer
})

const store = createStore(allReducer, {
  products: [{ name: 'phone' }],
  user: {user:'mani'}
},
  window.devToolsExtension && window.devToolsExtension()
);

console.log(store.getState());

const updateUserAction = {
  type: 'updateUser',
  payload: {
    user: 'gwtham'
  }

}

store.dispatch(updateUserAction);

console.log(store.getState());


ReactDOM.render(<Provider store={store}><App context="this is context" /></Provider>, document.getElementById('root'));
registerServiceWorker();
