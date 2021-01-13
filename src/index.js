import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import allReducers from './reducers';

const myStore = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>
    ,document.getElementById('root')
)
