import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  return (
    <>
      <section className="question-section">
        <h2 className="question-text">{props.question}</h2>
        <div className="answers-container">
          {props.answers.map(ans => (
            <Answer
              key={ans.id}
              id={ans.id}
              text={ans.text}
              isCorrect={ans.isCorrect}
              isSelected={ans.isSelected}
              showAnswers={props.showAnswers}
              holdAnswer={() => props.holdAnswer(props.id, ans.id)}
            />
          ))}
        </div>
      </section>

    </>
  )
}