import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '~/redux/auth/actions';

class Header extends Component {
  onClickLogout() {
    this.props.logout();
  }

  render() {
    return (
      <nav className="header">
        <a href="/">
          <h1 className="header-title">Kanban Board</h1>
        </a>

        <ul className="header-list">
          <li>
            <a
              className="header-list-link"
              onClick={this.onClickLogout.bind(this)}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapPropsToState = (state, ownProps) => ({});

const mapActionsToState = (dispatch) => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapPropsToState, mapActionsToState)(Header);
