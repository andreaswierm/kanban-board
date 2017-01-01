import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as authActions from '~/redux/auth/actions';
import * as organizationActions from '~/redux/organization/actions';

class Header extends Component {
  componentWillMount() {
    const {
      loadOrganizations,
      organizationList,
      selectedOrganizationId
    } = this.props;

    if (!organizationList.length) {
      loadOrganizations(selectedOrganizationId);
    }
  }

  onClickLogout() {
    this.props.logout();
  }

  onClickSelectOrganization(organization) {
    this.props.onSelectOrganization(organization.id);
  }

  render() {
    return (
      <nav className="header">
        <a href="/">
          <h1 className="header-title">Kanban Board</h1>
        </a>

        {this.renderOrganizationDropdown()}
      </nav>
    );
  }

  renderOrganizationDropdown() {
    let organizationListNodes = [];

    const {
      organizationList,
      selectedOrganizationId
    } = this.props;

    organizationListNodes = organizationList.map((organization, index) => {
      let classNames = ['dropdown-list-item'];

      if (parseInt(selectedOrganizationId) === organization.id) {
        classNames.push('dropdown-list-item-selected');
      }

      return (
        <li
          key={index}
          className={classNames.join(' ')}>
          <a onClick={this.onClickSelectOrganization.bind(this, organization)}>
            {organization.name}
          </a>
        </li>
      );
    });

    return (
      <ul className="header-list">
        <li>
          <div className="dropdown">
            <a className="header-list-link">
              More
            </a>

            <div className="dropdown-content dropdown-content-alignLeft">
              <ul className="dropdown-list">
                {organizationListNodes}

                <li className="dropdown-list-item">
                  <hr className="dropdown-list-separate" />
                </li>

                <li className="dropdown-list-item">
                  <a
                    onClick={this.onClickLogout.bind(this)}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

const mapPropsToState = (state, ownProps) => ({
  organizationList: state.ORGANIZATION.list,
  selectedOrganizationId: ownProps.params.organizationId
});

const mapActionsToState = (dispatch) => ({
  loadOrganizations: (selectedOrganizationId) => dispatch(organizationActions.loadAll(selectedOrganizationId)),
  logout: () => dispatch(authActions.logout()),
  onSelectOrganization: (id) =>  dispatch(push(`/organizations/${id}/projects`))
});

export default connect(mapPropsToState, mapActionsToState)(Header);
