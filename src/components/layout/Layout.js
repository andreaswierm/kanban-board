import React, { Component }  from 'react';
import { Header } from '~/modules';

class Layout extends Component {
  render() {
    return (
      <div className="layout-container">
        <div>
          <Header />
        </div>

        <div className="layout-children">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
