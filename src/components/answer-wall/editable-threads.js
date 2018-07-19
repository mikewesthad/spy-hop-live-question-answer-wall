import React, { Component } from "react";
import { observer } from "mobx-react";
import Thread from "../thread";
import Container from "../container";
import { animateScroll } from "react-scroll";
import isEqual from "lodash.isequal";
import classNames from "classnames";
import style from "./index.module.scss";

// A component that watches it's data prop, prevents reloading when the data prop changes and
// instead displays a prompt to the user
@observer
export default class EditableThreads extends Component {
  state = {
    selected: null,
    submittingAnswer: false
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
    this.setState({ submittingAnswer: true });
    this.props.store.addNewAnswer(selected, answer).then(() => {
      this.setState({ selected: null, renderData: null, submittingAnswer: false });
      animateScroll.scrollToTop();
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.renderData) {
      state.renderData = props.data;
      return state;
    }
    return null;
  }

  updateToLatest = () => {
    this.setState(prevState => ({ renderData: null }));
    animateScroll.scrollToTop();
  };

  render() {
    const { selected, renderData } = this.state;
    const { data } = this.props;

    const hasUpdates = !isEqual(data, renderData);
    // const hasSelectedUpdates =
    //   selected !== null &&
    //   !isEqual(
    //     data.find(([key, val]) => key === selected),
    //     renderData.find(([key, val]) => key === selected)
    //   );
    /* <p>{hasSelectedUpdates ? "Currently editing an answered question!" : ""}</p> */

    return (
      <Container>
        <div className={classNames(style.refreshToast, !hasUpdates && style.hide)}>
          There are new posts! Click{" "}
          <span className="link" onClick={this.updateToLatest}>
            here
          </span>{" "}
          to update the page.
        </div>
        <ul>
          {renderData.map(([key, threadData], i) => {
            const isSelected = key === selected;
            return (
              <li className={style.threadContainer} key={key}>
                {isSelected ? (
                  <Thread
                    {...threadData}
                    showReplyButton={false}
                    showReplyForm={true}
                    onSubmit={this.submitAnswer}
                  />
                ) : (
                  <Thread
                    {...threadData}
                    onReplyClick={() => this.onSelectThread(key)}
                    showReplyButton={true}
                    showReplyForm={false}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}
