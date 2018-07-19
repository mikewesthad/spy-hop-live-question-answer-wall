import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import PropTypes from "prop-types";
import noop from "../utils/noop";

const isLengthBetween = (string, min, max) => string.length >= min && string.length <= max;

export class TextEntry extends Component {
  static propTypes = {
    minCharacters: PropTypes.number,
    maxCharacters: PropTypes.number.isRequired,
    onSubmit: PropTypes.func,
    submitText: PropTypes.string,
    autoFocus: PropTypes.bool
  };

  static defaultProps = {
    submitText: "Submit",
    onSubmit: noop,
    minCharacters: 1,
    autoFocus: false
  };

  state = {
    value: ""
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const { value } = this.state;
    const { minCharacters, maxCharacters, onSubmit } = this.props;

    if (isLengthBetween(value, minCharacters, maxCharacters)) {
      onSubmit(this.state.value);
      this.setState({ value: "" });
    }
  };

  render() {
    const { value } = this.state;
    const {
      minCharacters,
      maxCharacters,
      submitText,
      autoFocus,
      onSubmit,
      ...otherProps
    } = this.props;

    const charCount = value.length;
    const isValid = isLengthBetween(value, minCharacters, maxCharacters);
    const isOver = value.length > maxCharacters;

    return (
      <form onSubmit={this.onSubmit} {...otherProps}>
        <Textarea
          autoFocus={autoFocus}
          onChange={this.onChange}
          minRows={6}
          style={{ width: "100%", resize: "none", display: "block" }}
          value={value}
        />
        <div
          style={{
            textAlign: "right",
            color: isOver ? "red" : "gray",
            fontSize: "0.75em",
            marginTop: "0.1rem"
          }}
        >
          {charCount} / {maxCharacters}
        </div>
        <input
          className="button"
          style={{ fontSize: "1.1rem" }}
          disabled={!isValid}
          type="submit"
          value={submitText}
        />
      </form>
    );
  }
}
