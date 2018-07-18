import React, { Component } from "react";
import { TextEntry } from "./text-entry";
import Container from "./container";

export default class Ask extends Component {
  state = {
    submitted: false
  };

  onSubmit = question => {
    this.props.store.addNewQuestion(question);
    this.setState({ submitted: true });
  };

  onAskAnother = () => this.setState({ submitted: false });

  render() {
    const { submitted } = this.state;

    if (submitted) {
      return (
        <Container>
          <h1 style={{ margin: "1rem 0", fontSize: "2rem" }}>Power Up</h1>
          <p style={{ margin: "1rem 0", fontSize: "1.1rem" }}>Thank you!</p>
          <button style={{ margin: "1rem 0" }} className="button" onClick={this.onAskAnother}>
            Ask Another
          </button>
        </Container>
      );
    }

    return (
      <Container>
        <h1 style={{ margin: "1rem 0", fontSize: "2rem" }}>Power Up</h1>
        <p style={{ margin: "1rem 0", fontSize: "1.1rem" }}>
          Ask the design students a question. Be specific!<br />
          <br />For example, you can ask about choices made, processes used, skills developed,
          lessons learned, etc.
        </p>
        <TextEntry
          style={{ margin: "1rem 0" }}
          minCharacters={1}
          maxCharacters={280}
          submitText="Submit"
          autoFocus={true}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}
