import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

class Task extends Component {
  render() {
    const {
      connectDragSource,
      title
    } = this.props;

    return connectDragSource(
      <div className="task-item">
        <span>{ title }</span>
      </div>
    );
  }
}

const taskSource = {
  beginDrag(props) {
    props.onDraggingStart(props.taskId);

    return {};
  }
};

const collect = (connect, monitor) => {
  return {connectDragSource: connect.dragSource()};
};

export default DragSource('task', taskSource, collect)(Task);
