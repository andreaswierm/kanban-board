import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { Modal } from '~/components';
import * as TaskListActions from '~/redux/task-list/actions';

class TaskListForm extends Component {
  state = {
    isEditing: false,
    name: ''
  }

  componentWillMount() {
    const {
      getTaskList,

      params: {
        organizationId,
        projectId,
        taskListId
      }
    } = this.props;

    if (taskListId) {
      getTaskList(organizationId, projectId, taskListId);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      taskListToEdit,

      params: {
        taskListId
      }
    } = nextProps;

    if (!nextState.isEditing && taskListId && taskListToEdit) {
      nextState.isEditing = true;
      nextState.name = taskListToEdit.name;
    }
  }

  onClickCloseModal() {
    const {
      close,
      organizationId,
      projectId
    } = this.props;

    close(organizationId, projectId);
  }

  onChangeName(event) {
    this.setState({name: event.target.value});
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
      taskListId,
      update
    } = this.props;

    event.preventDefault();

    if (isEditing) {
      promise = update(organizationId, projectId, taskListId, {name})
    } else {
      promise = create(organizationId, projectId, {name})
    }

    promise.then(() => {
      close(organizationId, projectId);
    });
  }

  render() {
    const {
      isEditing,
      name
    } = this.state;

    return (
      <Modal onClickClose={this.onClickCloseModal.bind(this)}>
        <h5>New Column</h5>

        <form onSubmit={this.onSubmitForm.bind(this)}>
          <fieldset>
            <label htmlFor="nameField">
              Name
            </label>

            <input
              type="text"
              placeholder="Done"
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
  organizationId: ownProps.params.organizationId,
  projectId: ownProps.params.projectId,
  taskListId: ownProps.params.taskListId,
  taskListToEdit: state.TASK_LIST.edit
});

const mapActionsToState = (dispatch) => ({
  close: (organizationId, projectId) => dispatch(push(`/organizations/${organizationId}/projects/${projectId}`)),
  create: (organizationId, projectId, payload) => dispatch(TaskListActions.create(organizationId, projectId, payload)),
  getTaskList: (organizationId, projectId, taskListId) => dispatch(TaskListActions.loadOne(organizationId, projectId, taskListId)),
  update: (organizationId, projectId, taskListId, payload) => dispatch(TaskListActions.update(organizationId, projectId, taskListId, payload))
});

export default connect(mapPropsToState, mapActionsToState)(TaskListForm);
