import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

import { auth } from './dbConfig';

import history from './history';

import { islogin, islogout, fetchAboutUser, fetchStreamsById } from './actions';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
);

auth.onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(islogin(user.uid));
        store.dispatch(fetchAboutUser(user.uid));
        store.dispatch(fetchStreamsById());
    } else {
        store.dispatch(islogout());
        console.log('wylogowani');
        history.push('/');
    }
});   

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);