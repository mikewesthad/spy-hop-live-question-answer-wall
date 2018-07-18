import React, { Component } from "react";
import { observer } from "mobx-react";
import Thread from "./thread";
import Container from "./container";

@observer
export default class Wall extends Component {
  render() {
    const { data, hasLoaded } = this.props.store;

    if (!hasLoaded) return <p style={{ textAlign: "center" }}>Loading...</p>;

    const entries = Object.entries(data);
    if (entries.length === 0) {
      return (
        <p style={{ textAlign: "center" }}>There are no questions yet. How about asking one?</p>
      );
    }

    return (
      <Container>
        <ul>
          {entries.map(([key, threadData], i) => {
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
