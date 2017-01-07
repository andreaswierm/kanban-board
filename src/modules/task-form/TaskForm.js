import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { Modal } from '~/components';
import * as TaskActions from '~/redux/task/actions';

class TaskForm extends Component {
  state = {
    taskListId: null,
    name: ''
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

  onSelectTaskList(event) {
    const taskListId = parseInt(event.target.value, 10);

    this.setState({taskListId});
  }

  onSubmitForm(event) {
    let {
      taskListId,
      name
    } = this.state;

    const {
      close,
      create,
      organizationId,
      projectId,
      taskLists
    } = this.props;

    if (!taskListId) {
      taskListId = taskLists[0].id;
    }

    event.preventDefault();

    create(
      organizationId,
      projectId,
      {
        taskListId,
        name
      }
    ).then(() => {
      close(organizationId, projectId);
    });
  }

  render() {
    const { name } = this.state;

    return (
      <Modal onClickClose={this.onClickCloseModal.bind(this)}>
        <h5>New Task</h5>

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

          {this.renderTaskListOptions()}

          <button
            className="button float-right"
            type="submit">
            Create
          </button>
        </form>
      </Modal>
    );
  }

  renderTaskListOptions() {
    const { taskLists } = this.props;

    const options = taskLists.map((taskList, index) => {
      return (
        <option
          key={index}
          value={taskList.id}>
          {taskList.name}
        </option>
      );
    });

    return (
      <fieldset>
        <label htmlFor="nameField">
          Column
        </label>

        <select onChange={this.onSelectTaskList.bind(this)}>
          {options}
        </select>
      </fieldset>
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  organizationId: ownProps.params.organizationId,
  projectId: ownProps.params.projectId,
  taskLists: state.TASK_LIST.list
});

const mapActionsToState = (dispatch) => ({
  close: (organizationId, projectId) => dispatch(push(`/organizations/${organizationId}/projects/${projectId}`)),
  create: (organizationId, projectId, payload) => dispatch(TaskActions.create(organizationId, projectId, payload))
});

export default connect(mapPropsToState, mapActionsToState)(TaskForm);
