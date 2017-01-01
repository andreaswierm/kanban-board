import React, { Component } from 'react';
import { Modal } from '~/components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import * as actions from '~/redux/project/actions';

class ProjectForm extends Component {
  state = {
    name: ''
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
    const { name } = this.state;

    const {
      close,
      organizationId
    } = this.props;

    event.preventDefault();

    this
      .props
      .create(organizationId, {
        name
      })
      .then(() => {
        close(organizationId);
      });
  }

  render() {
    const { name } = this.state;

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
            Create
          </button>
        </form>
      </Modal>
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  organizationId: ownProps.organizationId
});

const mapActionsToState = (dispatch) => ({
  close: (organizationId) => dispatch(push(`/organizations/${organizationId}/projects`)),
  create: (organizationId, payload) => dispatch(actions.create(organizationId, payload))
});

export default connect(mapPropsToState, mapActionsToState)(ProjectForm);
