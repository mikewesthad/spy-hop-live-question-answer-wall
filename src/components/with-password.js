import React, { Component } from "react";

// Note: not real security measure, mock up of flow once server is in place
export default class WithPassword extends Component {
  state = {
    password: "",
    correctPassword: false,
    showError: false
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.password === process.env.REACT_APP_ANSWERS_PASSWORD) {
      this.setState({ correctPassword: true });
    } else {
      this.setState({ showError: true });
    }
  };

  onChange = event => {
    this.setState({ password: event.target.value, showError: false });
  };

  render() {
    const { password, correctPassword, showError } = this.state;

    if (!correctPassword) {
      return (
        <form onSubmit={this.onSubmit}>
          <label style={{ display: "block", margin: "0 auto", textAlign: "center" }}>
            Enter Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={this.onChange}
            autoFocus
            style={{ margin: "1rem auto", display: "block" }}
          />
          <input
            className="button"
            type="submit"
            value="Submit"
            style={{ margin: "1rem auto", display: "block" }}
          />
          {showError && (
            <p
              style={{
                margin: "1rem auto",
                display: "block",
                textAlign: "center",
                color: "red",
                fontSize: "0.75rem"
              }}
            >
              Wrong password - try again.
            </p>
          )}
        </form>
      );
    }

    return this.props.children;
  }
}
