// import 'babel-polyfill';
import 'bootstrap';
import 'jquery';
import 'bootstrap-sass';
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './store/routes';
import { rootReducer } from './reducers';
import { Header } from './components';

import './styles/index.scss';

const initialState = {};
const store: Store<any> = createStore(rootReducer, initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <Header />
      <div className="main">
        <Router history={history}>
          {routes}
        </Router>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);
