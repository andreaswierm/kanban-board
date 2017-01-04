import React, { Component } from 'react';
import { Modal } from '~/components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import * as actions from '~/redux/project/actions';

class ProjectForm extends Component {
  state = {
    isEditing: false,
    name: ''
  }

  componentWillMount() {
    const {
      list,
      getProject,

      params: {
        organizationId,
        projectId
      }
    } = this.props;

    const { isEditing } = this.state;

    if (projectId) {
      getProject(organizationId, projectId);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      list,
      projectToEdit,

      params: {
        projectId
      }
    } = nextProps;

    if (!nextState.isEditing && projectId && projectToEdit) {
      nextState.isEditing = true;
      nextState.name = projectToEdit.name;
    }
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
  projectId: ownProps.params.projectId,
  projectToEdit: state.PROJECT.edit
});

const mapActionsToState = (dispatch) => ({
  close: (organizationId) => dispatch(push(`/organizations/${organizationId}/projects`)),
  create: (organizationId, payload) => dispatch(actions.create(organizationId, payload)),
  getProject: (organizationId, projectId) => dispatch(actions.getProject(organizationId, projectId)),
  update: (organizationId, projectId, payload) => dispatch(actions.update(organizationId, projectId, payload))
});

export default connect(mapPropsToState, mapActionsToState)(ProjectForm);
