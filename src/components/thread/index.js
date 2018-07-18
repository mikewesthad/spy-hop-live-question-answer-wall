import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import style from "./index.module.scss";

export function MessageBox({ children, pullRight, showTopBorder = true }) {
  const css = {};
  if (!showTopBorder) css.borderTop = "0";
  return (
    <div className={pullRight ? style.messageRight : ""}>
      <div className={style.message} style={css}>
        {children}
      </div>
    </div>
  );
}

function Question({ timestamp, text }) {
  return (
    <MessageBox>
      <div className={style.timestamp}>Asked {distanceInWordsToNow(timestamp)} ago</div>
      <div className={style.text}>{text}</div>
    </MessageBox>
  );
}

function Answer({ timestamp, text }) {
  return (
    <MessageBox pullRight={true} showTopBorder={false}>
      <div className={style.timestamp}>Answered {distanceInWordsToNow(timestamp)} ago</div>
      <div className={style.text}>{text}</div>
    </MessageBox>
  );
}

export default function Thread({ question, answers, ...otherProps }) {
  const entries = answers ? Object.entries(answers) : [];

  return (
    <ol className={style.thread} {...otherProps}>
      <li>
        <Question {...question} />
      </li>
      {entries.map(([key, answer], i) => {
        return (
          <li>
            <Answer {...answer} />
          </li>
        );
      })}
    </ol>
  );
}
