import React, { Component } from "react";
import { observer } from "mobx-react";
import Thread from "./thread";
import Container from "./container";
import Loading from "./loading";

@observer
export default class Wall extends Component {
  render() {
    const { sortedDataEntries, hasLoaded } = this.props.store;

    if (!hasLoaded) return <Loading />;

    if (sortedDataEntries.length === 0) {
      return (
        <Container>
          <p>There are no questions yet. How about asking one?</p>
        </Container>
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
