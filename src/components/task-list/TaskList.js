import React, { Component } from 'react';
import { Task } from '~/components';
import { Link } from 'react-router';

class TaskList extends Component {
  onClickRemove() {
    const {
      onClickRemoveTaskList,
      title
    } = this.props;

    if (confirm(`Are you sure that you want to remove the column ${title}`)) {
      onClickRemoveTaskList();
    }
  }

  render() {
    const {
      organizationId,
      projectId,
      taskListId,
      title
    } = this.props;

    return (
      <div className="taskList-container">
        <span className="taskList-title">
          <Link to={`/organizations/${organizationId}/projects/${projectId}/task-list/${taskListId}`}>
            {title}
          </Link>

          <a
            className="float-right"
            onClick={this.onClickRemove.bind(this)}>
            X
          </a>
        </span>

        <ul className="taskList-list">
          {this.renderTasks()}
        </ul>
      </div>
    );
  }

  renderTasks() {
    const { tasks } = this.props;

    return tasks.map((task, index) => {
      return (
        <li key={index} className="taskList-item">
          <Task title={task.name} />
        </li>
      );
    });
  }
}

export default TaskList;
