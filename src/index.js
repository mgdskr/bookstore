import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import reducer from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';
import App from './components/App';

const middleware = [ thunk ];
// if (process.env.NODE_ENV !== 'production') {
//     middleware.push(createLogger())
// }

const store = createStore(reducer, applyMiddleware(...middleware));


injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
