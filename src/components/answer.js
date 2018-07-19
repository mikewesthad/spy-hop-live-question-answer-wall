import React, { Component } from "react";
import { observer } from "mobx-react";
import Thread from "./thread";
import Container from "./container";

@observer
export default class Answer extends Component {
  state = {
    selected: null
  };

  onSelectThread = key => {
    this.setState(prevState => {
      if (key !== prevState.selected) return { selected: key };
      else return prevState;
    });
  };

  updateAnswer = event => {
    this.setState({ answer: event.target.value });
  };

  submitAnswer = answer => {
    const { selected } = this.state;
    this.props.store.addNewAnswer(selected, answer);
    this.setState({ selected: null });
  };

  render() {
    const { selected } = this.state;
    const { sortedDataEntries, hasLoaded } = this.props.store;

    if (!hasLoaded) return <p style={{ textAlign: "center" }}>Loading...</p>;

    if (sortedDataEntries.length === 0) {
      return (
        <p style={{ textAlign: "center" }}>There are no questions yet. How about asking one?</p>
      );
    }

    return (
      <Container>
        <p style={{ textAlign: "center", margin: "0 0 2rem 0" }}>
          Click on a thread to add an answer.
        </p>
        <ul>
          {sortedDataEntries.map(([key, threadData], i) => {
            const isSelected = key === selected;
            const isFirst = i === 0;
            return (
              <li
                key={key}
                onClick={() => this.onSelectThread(key)}
                style={{
                  marginTop: isFirst ? 0 : "3rem",
                  cursor: "pointer"
                }}
              >
                {isSelected ? (
                  <Thread {...threadData} enableResponse={true} onSubmit={this.submitAnswer} />
                ) : (
                  <Thread {...threadData} />
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}
