import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import { Task } from '~/components';

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
      connectDropTarget,
      organizationId,
      projectId,
      taskListId,
      title
    } = this.props;

    return connectDropTarget(
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
    const {
      onDraggingStart,
      tasks
    } = this.props;

    return tasks.map((task, index) => {
      return (
        <li key={index} className="taskList-item">
          <Task
            taskId={task.id}
            title={task.name}
            onDraggingStart={onDraggingStart}/>
        </li>
      );
    });
  }
}

const taskTarget = {
  drop(props) {
    props.onDraggingOver(props.taskListId);
  }
};

const collect = (connect, monitor) => {
  return {connectDropTarget: connect.dropTarget()};
};


export default DropTarget('task', taskTarget, collect)(TaskList);
