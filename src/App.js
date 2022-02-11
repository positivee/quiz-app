import { useState, useEffect } from "react";
import Quiz from "./componets/Quiz.js";

function App() {
  const [quizStart, setQuizStart] = useState(false);

  const startTheGame = () => {
    setQuizStart((oldQuizStart) => !oldQuizStart);
  };

  function resetQuiz() {
    startTheGame(false);
  }
  return (
    <div className="App">
      {quizStart === false ? (
        <div className="welcome-main">
          <h1 className="app-name">Quizzical</h1>
          <p className="app-description">Some description if needed</p>
          <button className="quiz-button" onClick={startTheGame}>
            Start quiz
          </button>
        </div>
      ) : (
        <Quiz resetQuiz={resetQuiz} />
      )}
    </div>
  );
}

export default App;
