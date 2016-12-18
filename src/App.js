import React, { Component } from 'react';

import store from './config/store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
  		<Provider store={store}>
        <h1>We have redux</h1>
  		</Provider>
  	);
  }
}

export default App;
