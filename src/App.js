import { useState } from "react";
import Quiz from "./componets/Quiz.js";

function App() {
  const [quizStart, setQuizStart] = useState(false);
  const [quizParametersFormData, setQuizParametersFormData] = useState({
    numberOfQuestion: "5",
    category: "18",
    difficulty: "easy",
  });

  function handleFormChanges(event) {
    console.log(event);
    const { name, value } = event.target;
    setQuizParametersFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  console.log(quizParametersFormData);
  const startTheGame = () => {
    setQuizStart((oldQuizStart) => !oldQuizStart);
  };

  function resetQuiz() {
    startTheGame(false);
    setQuizParametersFormData({
      numberOfQuestion: "5",
      category: "18",
      difficulty: "easy",
    });
  }

  return (
    <div className="App">
      {quizStart === false ? (
        <div className="welcome-main">
          <h1 className="app-name">Quizzical</h1>
          <p className="app-description">Some description if needed</p>
          <form className="quiz-setup-form">
            <label htmlFor="numberOfQuestion">Select Difficulty:</label>

            <input
              type="number"
              placeholder="Number of questions (max 20)"
              min="5"
              max="20"
              id="numberOfQuestion"
              value={quizParametersFormData.numberOfQuestion}
              onChange={handleFormChanges}
              name="numberOfQuestion"
            />

            <label htmlFor="category">Select Category:</label>

            <select
              id="category"
              value={quizParametersFormData.category}
              onChange={handleFormChanges}
              name="category"
            >
              <option value="18">Computer Sience</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
            </select>

            <label htmlFor="difficulty">Select Difficulty:</label>

            <select
              id="difficulty"
              value={quizParametersFormData.difficulty}
              onChange={handleFormChanges}
              name="difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </form>
          <button className="quiz-button" onClick={startTheGame}>
            Start quiz
          </button>
        </div>
      ) : (
        <Quiz quizSetup={quizParametersFormData} resetQuiz={resetQuiz} />
      )}
    </div>
  );
}

export default App;
