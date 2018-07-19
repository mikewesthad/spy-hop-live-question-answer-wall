import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import classNames from "classnames";
import { TextEntry } from "../text-entry";
import style from "./index.module.scss";

function ResponseBox({ onSubmit, ...props }) {
  const classes = classNames(style.answer, style.answerLast);
  return (
    <div className={style.answerWrapper}>
      <MessageBox className={classes} {...props}>
        <TextEntry maxCharacters={280} submitText="Submit" onSubmit={onSubmit} />
      </MessageBox>
    </div>
  );
}

function MessageBox({ children, className, ...otherProps }) {
  return (
    <div className={classNames(className, style.message)} {...otherProps}>
      {children}
    </div>
  );
}

function Question({ timestamp, text }) {
  return (
    <MessageBox className={style.question}>
      <div className={style.timestamp}>Asked {distanceInWordsToNow(timestamp)} ago</div>
      <div className={style.text}>{text}</div>
    </MessageBox>
  );
}

function Answer({ timestamp, text, isLast, ...props }) {
  const classes = classNames(style.answer, isLast && style.answerLast);
  return (
    <div className={style.answerWrapper}>
      <MessageBox className={classes}>
        <div className={style.timestamp}>Answered {distanceInWordsToNow(timestamp)} ago</div>
        <div className={style.text}>{text}</div>
      </MessageBox>
    </div>
  );
}

export default function Thread({ question, answers, enableResponse, onSubmit, ...otherProps }) {
  const entries = answers ? Object.entries(answers) : [];

  return (
    <div className={style.thread} {...otherProps}>
      <Question {...question} />
      {entries.map(([key, answer], i) => {
        return (
          <Answer key={key} {...answer} isLast={!enableResponse && i === entries.length - 1} />
        );
      })}
      {enableResponse && <ResponseBox onSubmit={onSubmit} />}
    </div>
  );
}
