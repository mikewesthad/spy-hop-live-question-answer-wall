import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import differenceInDays from "date-fns/difference_in_days";
import format from "date-fns/format";
import classNames from "classnames";
import { TextEntry } from "../text-entry";
import style from "./index.module.scss";

function formatTimestamp(timestamp, type = "question") {
  const prefix = type.match(/question/i) ? "Asked" : "Answered";
  if (differenceInDays(Date.now(), timestamp) > 1) {
    return `${prefix} at ${format(timestamp, "MMM Do YY, hh:mma")}`;
  } else {
    return `${prefix} ${distanceInWordsToNow(timestamp)} ago`;
  }
}

function ReplyBox({ onClick }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div className={style.replyBox}>
        <button onClick={onClick} className="button">
          Reply
        </button>
      </div>
    </div>
  );
}

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
      <div className={style.timestamp}>{formatTimestamp(timestamp, "question")}</div>
      <div className={style.text}>{text}</div>
    </MessageBox>
  );
}

function Answer({ timestamp, text, isLast, ...props }) {
  const classes = classNames(style.answer, isLast && style.answerLast);
  return (
    <div className={style.answerWrapper}>
      <MessageBox className={classes}>
        <div className={style.timestamp}>{formatTimestamp(timestamp, "answer")}</div>
        <div className={style.text}>{text}</div>
      </MessageBox>
    </div>
  );
}

export default function Thread({
  question,
  answers,
  showReplyButton,
  showReplyForm,
  onReplyClick,
  onSubmit,
  ...otherProps
}) {
  const entries = answers ? Object.entries(answers) : [];

  return (
    <div className={style.thread} {...otherProps}>
      <Question {...question} />
      {entries.map(([key, answer], i) => {
        return <Answer key={key} {...answer} isLast={!showReplyForm && i === entries.length - 1} />;
      })}
      {showReplyForm && <ResponseBox onSubmit={onSubmit} />}
      {showReplyButton && <ReplyBox onClick={onReplyClick} />}
    </div>
  );
}
