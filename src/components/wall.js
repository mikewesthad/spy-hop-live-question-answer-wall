import React, { Component } from "react";
import { observer } from "mobx-react";
import Thread from "./thread";
import Container from "./container";

@observer
export default class Wall extends Component {
  render() {
    const { sortedDataEntries, hasLoaded } = this.props.store;

    if (!hasLoaded) return <p style={{ textAlign: "center" }}>Loading...</p>;

    if (sortedDataEntries.length === 0) {
      return (
        <p style={{ textAlign: "center" }}>There are no questions yet. How about asking one?</p>
      );
    }

    return (
      <Container>
        <ul>
          {sortedDataEntries.map(([key, threadData], i) => {
            const isFirst = i === 0;
            return (
              <li
                key={key}
                style={{
                  marginTop: isFirst ? 0 : "3rem"
                }}
              >
                <Thread {...threadData} />
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}
