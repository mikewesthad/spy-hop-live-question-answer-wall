import React, { Component } from "react";
import { observer } from "mobx-react";
import Container from "../container";
import { toJS } from "mobx";
import Loading from "../loading";
import EditableThreads from "./editable-threads";

@observer
export default class AnswerWall extends Component {
  render() {
    const { sortedDataEntries, hasLoaded } = this.props.store;

    if (!hasLoaded) {
      return (
        <Container>
          <p>Loading...</p>
        </Container>
      );
    }

    if (!hasLoaded) return <Loading />;

    if (sortedDataEntries.length === 0) {
      return (
        <Container>
          <p>There are no questions yet. How about asking one?</p>
        </Container>
      );
    }

    // Dereference and convert data to plain JS
    const latestData = sortedDataEntries.map(([key, value, timestamp]) => {
      return [key, toJS(value), timestamp];
    });

    return <EditableThreads data={latestData} store={this.props.store} />;
  }
}
