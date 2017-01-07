import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as taskActions from '~/redux/task/actions';
import * as taskListActions from '~/redux/task-list/actions';
import { Link } from 'react-router';
import { TaskList } from '~/components';

class ProjectBoard extends Component {
  componentWillMount() {
    const {
      loadTaskLists,
      loadTasks,
      organizationId,
      projectId
    } = this.props;

    loadTaskLists(organizationId, projectId)
      .then(() => {
        loadTasks(organizationId, projectId);
      });
  }

  onClickRemoveTaskList(taskList) {
    const {
      organizationId,
      projectId,
      removeTaskList
    } = this.props;

    removeTaskList(organizationId, projectId, taskList.id);
  }

  render() {
    const {
      children,
      organizationId,
      projectId
    } = this.props;

    return (
      <div>
        <div className="board-container">
          <div className="align-right">
            <Link
              to={`/organizations/${organizationId}/projects/${projectId}/tasks/new`}
              className="button button-outline">
              Add Task
            </Link>

            <Link
              to={`/organizations/${organizationId}/projects/${projectId}/task-list/new`}
              className="button button-outline marginLeft-medium">
              Add Column
            </Link>
          </div>

          <div className="board-task-list-container">
            {this.renderTaskLists()}
          </div>
        </div>

        {children}
      </div>
    );
  }

  renderTaskLists() {
    const {
      organizationId,
      projectId,
      taskLists,
      tasks
    } = this.props;

    return taskLists
      .sort((taskList) => {
        return taskList.position;
      })
      .map((taskList, index) => {
        const tasksForList = tasks.filter((task) => {
          return taskList.id === task.taskListId;
        });

        return (
          <TaskList
            key={index}
            onClickRemoveTaskList={this.onClickRemoveTaskList.bind(this, taskList)}
            organizationId={organizationId}
            projectId={projectId}
            taskListId={taskList.id}
            tasks={tasksForList}
            title={taskList.name} />
        );
      });
  }
}

const mapPropsToState = (state, ownProps) => ({
  organizationId: ownProps.params.organizationId,
  projectId: ownProps.params.projectId,
  taskLists: state.TASK_LIST.list,
  tasks: state.TASK.list
});

const mapActionsToState = (dispatch) => ({
  loadTaskLists: (organizationId, projectId) => dispatch(taskListActions.loadAll(organizationId, projectId)),
  loadTasks: (organizationId, projectId) => dispatch(taskActions.loadAll(organizationId, projectId)),
  removeTaskList: (organizationId, projectId, id) => dispatch(taskListActions.remove(organizationId, projectId, id))
});

export default connect(mapPropsToState, mapActionsToState)(ProjectBoard);
