import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '~/redux/auth/actions';

class Auth extends Component {
  componentDidMount() {
    this.props.authorize();
  }

  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return this.props.children;
  }
}

const mapPropsToState = (state, ownProps) => ({
  isAuthenticated: state.AUTH.isAuthenticated
});

const mapActionsToState = (dispatch) => ({
  authorize: () => dispatch(actions.authorize())
});

export default connect(mapPropsToState, mapActionsToState)(Auth);
