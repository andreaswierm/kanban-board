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

    const childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, this.props);
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
            {list.map(this.renderTableRow)}
          </tbody>
        </table>

        {childrenWithProps}
      </div>
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
  list: state.PROJECT.list,
  organizationId: ownProps.params.organizationId
});

const mapActionsToState = (dispatch) => ({
  loadAll: (organizationId) => dispatch(actions.loadAll(organizationId))
});

export default connect(mapPropsToState, mapActionsToState)(ProjectList);
