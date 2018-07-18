import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

export default function Thread({ question, answers, ...otherProps }) {
  const entries = answers ? Object.entries(answers) : [];

  if (question.timestamp) {
    console.log(new Date(question.timestamp));
  }
  return (
    <ol {...otherProps}>
      <li style={{ width: "650px", margin: "0 auto" }}>
        <div className="question">
          {question.timestamp && (
            <div style={{ fontSize: "0.75rem", fontStyle: "italic", marginBottom: "0.75rem" }}>
              Asked {distanceInWordsToNow(question.timestamp)} ago
            </div>
          )}
          {question.text || question}
        </div>
      </li>
      {entries.map(([key, answer], i) => {
        //const isFirst = i === 0;
        //const isLast = i === entries.length - 1;
        const style = {
          width: "600px",
          marginLeft: "50px",
          borderTop: "none"
        };
        console.log(answer.text || answer);
        /* if (!isLast) {
          style.borderTop = "none";
          style.borderBottomColor = "#f7f6f4";
        } else {
          style.borderTop = "none";
        } */
        return (
          <li style={{ width: "650px", margin: "0 auto", position: "relative" }}>
            <div className="answer" style={style}>
              {answer.text || answer}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
