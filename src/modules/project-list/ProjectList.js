import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '~/redux/project/actions';

class ProjectList extends Component {
  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    const { list } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>

            <th>
              <div className="float-right">
                Created at
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {list.map(this.renderTableRow)}
        </tbody>
      </table>
    );
  }

  renderTableRow(project, index) {
    return (
      <tr key={index}>
        <td>
          <a>
            {project.name}
          </a>
        </td>

        <td>
          <div className="float-right">
            {project.createdAt.format('MMMM Do')}
          </div>
        </td>
      </tr>
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  list: state.PROJECT.list
});

const mapActionsToState = (dispatch) => ({
  loadAll: () => dispatch(actions.loadAll())
});

export default connect(mapPropsToState, mapActionsToState)(ProjectList);
