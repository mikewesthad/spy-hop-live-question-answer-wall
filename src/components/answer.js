import React, { Component } from "react";
import { observer } from "mobx-react";
import Thread from "./thread";
import { TextEntry } from "./text-entry";

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

  handleSubmit(event) {
    event.preventDefault();
  }

  submitAnswer = answer => {
    const { selected } = this.state;
    this.props.store.addNewAnswer(selected, answer);
    this.setState({ selected: null });
  };

  render() {
    const { selected } = this.state;
    const { data, hasLoaded } = this.props.store;

    if (!hasLoaded) return <p style={{ textAlign: "center" }}>Loading...</p>;

    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <p style={{ textAlign: "center" }}>There are no questions yet.</p>;
    }

    return (
      <div>
        <p style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
          Click on a thread to add an answer.
        </p>
        <ul>
          {entries.map(([key, threadData], i) => {
            const isSelected = key === selected;
            const isFirst = i === 0;
            return (
              <li
                key={key}
                onClick={() => this.onSelectThread(key)}
                style={{
                  marginTop: isFirst ? 0 : "3rem"
                }}
              >
                <Thread {...threadData} className={isSelected ? "thread--active" : "thread"} />
                {isSelected && (
                  <div style={{ width: "650px", margin: "0 auto" }}>
                    <div
                      className="answer"
                      style={{ width: "600px", marginLeft: "50px", borderTop: "none" }}
                    >
                      <TextEntry
                        maxCharacters={280}
                        submitText="Submit"
                        onSubmit={this.submitAnswer}
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
