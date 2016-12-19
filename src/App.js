import React, { Component } from 'react';

import store from './config/store';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
  		<Provider store={store}>
        <Router history={history}>
          <Route path="/">
          </Route>
        </Router>
  		</Provider>
  	);
  }
}

export default App;
