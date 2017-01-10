import React, { Component } from 'react';
import * as actions from '~/redux/project/actions';
import API from '~/api';
import { connect } from 'react-redux';
import { Modal } from '~/components';
import { push } from 'react-router-redux'

class ProjectForm extends Component {
  state = {
    isEditing: false,
    name: ''
  }

  componentWillMount() {
    const {
    //   getProject,

      params: {
        organizationId,
        projectId
      }
    } = this.props;

    API
      .Project
      .get(organizationId, projectId)
      .then((project) => {
        this.setState({
          isEditing: true,
          name: project.name
        });
      });
  }

  onChangeName(event) {
    this.setState({name: event.target.value});
  }

  onClickCloseModal() {
    const {
      close,
      organizationId
    } = this.props;

    close(organizationId);
  }

  onSubmitForm(event) {
    let promise;

    const {
      isEditing,
      name
    } = this.state;

    const {
      close,
      create,
      organizationId,
      projectId,
      update
    } = this.props;

    event.preventDefault();

    if (isEditing) {
      promise = update(organizationId, projectId, {name})
    } else {
      promise = create(organizationId, {name})
    }

    promise.then(() => {
      close(organizationId);
    });
  }

  render() {
    const {
      isEditing,
      name
    } = this.state;

    return (
      <Modal onClickClose={this.onClickCloseModal.bind(this)}>
        <h5>New Project</h5>

        <form onSubmit={this.onSubmitForm.bind(this)}>
          <fieldset>
            <label htmlFor="nameField">
              Name
            </label>

            <input
              type="text"
              placeholder="Lets get something done!"
              id="nameField"
              value={name}
              onChange={this.onChangeName.bind(this)} />
          </fieldset>

          <button
            className="button float-right"
            type="submit">
            {isEditing ? 'Save' : 'Create'}
          </button>
        </form>
      </Modal>
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  list: state.PROJECT.list,
  organizationId: ownProps.params.organizationId,
  projectId: ownProps.params.projectId
});

const mapActionsToState = (dispatch) => ({
  close: (organizationId) => dispatch(push(`/organizations/${organizationId}/projects`)),
  create: (organizationId, payload) => dispatch(actions.create(organizationId, payload)),
  update: (organizationId, projectId, payload) => dispatch(actions.update(organizationId, projectId, payload))
});

export default connect(mapPropsToState, mapActionsToState)(ProjectForm);
