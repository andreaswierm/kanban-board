import React, { Component } from 'react';

class Unauthorized extends Component {
  render() {
    return (
      <div className="unauthorized-container">
        <h1>
          I think you should log in with RedBoooth first.
        </h1>

        <a
          className="button button-outline"
          href="http://localhost:3000/auth/redbooth">
          Log in with RedBooth
        </a>
      </div>
    );
  }
}

export default Unauthorized;
