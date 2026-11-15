import React from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Intro from "./Components/Intro";
import Question from "./Components/Question";

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [score, setScore] = React.useState(0);

  function begin() {
    console.log("click");
    setStartQuiz(true);
  }

  async function getQuiz() {
    try {
      const res = await fetch(
        "https://the-trivia-api.com/v2/questions?limit=5",
      );
      const data = await res.json();
      console.log(data);
      if (data && data.length > 0) {
        const formattedData = data.map((ques) => {
          const incorrect = ques.incorrectAnswers.map((ans) => ({
            id: nanoid(),
            text: ans,
            isCorrect: false,
            isSelected: false,
          }));

          const correct = {
            id: nanoid(),
            text: ques.correctAnswer,
            isCorrect: true,
            isSelected: false,
          };

          const allAnswers = shuffleArray([...incorrect, correct]);

          return {
            id: nanoid(),
            question: ques.question.text,
            answers: allAnswers,
          };
        });

        setQuestions(formattedData);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }

  const effectRan = React.useRef(false);

  React.useEffect(() => {
    if (effectRan.current === false) {
      getQuiz();

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function holdAnswer(questionId, answerId) {
    setQuestions((prevQuest) =>
      prevQuest.map((q) => {
        if (q.id === questionId) {
          const newAnswers = q.answers.map((ans) => {
            return ans.id === answerId
              ? { ...ans, isSelected: !ans.isSelected }
              : { ...ans, isSelected: false };
          });
          return { ...q, answers: newAnswers };
        }
        return q;
      }),
    );
  }

  function checkAnswers() {
    setShowAnswers(true);
    let count = 0;
    questions.forEach((q) => {
      q.answers.forEach((ans) => {
        if (ans.isSelected && ans.isCorrect) {
          count++;
        }
      });
    });
    setScore(count);
  }

  function playAgain() {
    setShowAnswers(false);
    setScore(0);
    getQuiz();
  }

  return (
    <main className={startQuiz ? "quiz-mode" : ""}>
      {showAnswers && score === 5 && <Confetti />}
      {!startQuiz ? (
        <Intro handleStart={begin} />
      ) : (
        <div className="quiz-container">
          {questions.map((quest) => (
            <Question
              key={quest.id}
              id={quest.id}
              question={quest.question}
              answers={quest.answers}
              holdAnswer={holdAnswer}
              showAnswers={showAnswers}
            />
          ))}
          <div className="check-container">
            {showAnswers && (
              <span className="score-text">
                You scored {score}/5 correct answers
              </span>
            )}
            <button
              className="check-btn"
              onClick={showAnswers ? playAgain : checkAnswers}
            >
              {showAnswers ? "Play Again" : "Check answers"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
