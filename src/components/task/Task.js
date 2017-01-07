import React, { Component } from 'react';

class Task extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className="task-item">
        <span>{ title }</span>
      </div>
    )
  }
}

export default Task;
