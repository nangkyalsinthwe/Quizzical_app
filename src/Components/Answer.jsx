import React from "react";

export default function Answer(props) {
  let backgroundColor = "transparent";
  let opacity = 1

  if (props.showAnswers) {
    if (props.isCorrect) {
      backgroundColor = "#94D7A2"
    } else if (props.isSelected && !props.isCorrect) {
      backgroundColor = "#F8BCBC"
      opacity = 0.5
    } else {
      opacity = 0.5
    }
  } else if (props.isSelected) {
    backgroundColor = "#D6DBF5"
  }

  const styles = {
    backgroundColor: backgroundColor,
    border: props.isSelected || (props.showAnswers && props.isCorrect) ? "none" : "1px solid #4D5B9E",
    opacity: opacity
  }

  return (
    <button
      className="answer-btn"
      style={styles}
      onClick={props.holdAnswer}
      disabled={props.showAnswers}
    >
      {props.text}
    </button>
  )
}