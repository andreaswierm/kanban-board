import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '~/redux/project/actions';

class ProjectList extends Component {
  componentDidMount() {
    const {
      loadAll,
      organizationId
    } = this.props;

    loadAll(organizationId);
  }

  render() {
    const {
      children,
      list,
      organizationId
    } = this.props;

    const tableRows = list.map((item, index) => {
      return this.renderTableRow(item, index);
    });

    return (
      <div>
        <Link
          to={`/organizations/${organizationId}/projects/new`}
          className="button button-outline float-right">
          New Project
        </Link>

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
            {tableRows}
          </tbody>
        </table>

        {children}
      </div>
    );
  }

  renderTableRow(project, index) {
    const { organizationId } = this.props;

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
            &nbsp;
            <Link to={`/organizations/${organizationId}/projects/${project.id}/edit`}>
              Edit
            </Link>
          </div>
        </td>
      </tr>
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  list: state.PROJECT.list,
  organizationId: ownProps.params.organizationId
});

const mapActionsToState = (dispatch) => ({
  loadAll: (organizationId) => dispatch(actions.loadAll(organizationId))
});

export default connect(mapPropsToState, mapActionsToState)(ProjectList);
