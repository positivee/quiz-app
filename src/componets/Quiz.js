import React, { useState, useEffect } from "react";
import Question from "./Question.js";
import { nanoid } from "nanoid";
import arrayShuffle from "array-shuffle";

function Quiz(props) {
  const { resetQuiz, quizSetup } = props;
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${quizSetup.numberOfQuestion}&category=${quizSetup.category}&difficulty=${quizSetup.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.results);
        setQuizData(setUpQuiz(result.results));
      });
  }, [quizSetup]);

  function setUpQuiz(result) {
    return result.map((elemenet) => {
      const answers = arrayShuffle(
        elemenet.incorrect_answers.concat(elemenet.correct_answer)
      );
      return {
        question_id: nanoid(),
        question: elemenet.question,
        correct_answer: elemenet.correct_answer,
        incorrect_answers: elemenet.incorrect_answers,
        all_answer: answers,
        selectedAnswer: "",
      };
    });
  }

  function handleClick(e, id, ans) {
    if (!isGameEnded) {
      setQuizData((selectedAnswer) =>
        selectedAnswer.map((answer) => {
          return answer.question_id === id
            ? { ...answer, selectedAnswer: ans }
            : answer;
        })
      );
    }
  }
  function calculateScore() {
    quizData.map((oldQuizData) => {
      if (oldQuizData.correct_answer === oldQuizData.selectedAnswer)
        setScore((oldScore) => oldScore + 1);
      return oldQuizData;
    });
    setGameEnded((oldGameState) => !oldGameState);
  }

  const displayQuizQuestion = quizData.map((question) => {
    return (
      <Question
        question={question}
        key={question.question_id}
        handleClick={handleClick}
        isGameEnded={isGameEnded}
      />
    );
  });

  return (
    <div className="Quiz">
      <div className="">{displayQuizQuestion}</div>
      <div className="button-section">
        {isGameEnded ? (
          <>
            <div className="score">
              You scored {score}/{quizSetup.numberOfQuestion} correct answers
            </div>
            <button className="quiz-button play-agin" onClick={resetQuiz}>
              Play agin
            </button>
          </>
        ) : (
          <button className="quiz-button" onClick={calculateScore}>
            Check answers
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
