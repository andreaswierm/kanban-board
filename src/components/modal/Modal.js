import React, { Component } from 'react';

class Modal extends Component {
  onClickClose() {
    this.props.onClickClose();
  }

  onClickPreventEvent(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className="modal-container"
        onClick={this.onClickClose.bind(this)}>

        <div
          className="modal"
          onClick={this.onClickPreventEvent.bind(this)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
