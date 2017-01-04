import React, { Component } from 'react';

import store from './config/store';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

import {
  Layout,
  Unauthorized
} from '~/components';

import {
  Auth,
  ProjectForm,
  ProjectList
} from '~/modules';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
  		<Provider store={store}>
        <Router history={history}>
          <Route component={Auth}>
            <Redirect from="/" to="/organizations/" />
            <Route path="organizations" component={Layout} />

            <Route path="organizations/:organizationId" component={Layout}>
              <Route path="projects" component={ProjectList}>
                <Route path="new" component={ProjectForm} />
                <Route path=":projectId/edit" component={ProjectForm} />
              </Route>
            </Route>
          </Route>

          <Route path="/unauthorized" component={Unauthorized} />
        </Router>
  		</Provider>
  	);
  }
}

export default App;
