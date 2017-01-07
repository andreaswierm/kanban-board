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
  ProjectBoard,
  ProjectForm,
  ProjectList,
  TaskForm,
  TaskListForm
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
                <Route path=":projectId/edit" component={ProjectForm} />
                <Route path="new" component={ProjectForm} />
              </Route>

              <Route path="projects/:projectId" component={ProjectBoard}>
                <Route path="task-list">
                  <Route path="new" component={TaskListForm} />
                  <Route path=":taskListId" component={TaskListForm} />
                </Route>

                <Route path="tasks">
                  <Route path="new" component={TaskForm} />
                </Route>
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
