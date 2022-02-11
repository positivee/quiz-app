import { decode } from "html-entities";
import { nanoid } from "nanoid";

function Question(props) {
  const { question, handleClick, isGameEnded } = props;
  const printAnswersToQuestion = question.all_answer.map((answer) => {
    const markedAnswerClassName = `
    ${question.correct_answer === answer ? "correct-answer" : "gray-answer"}
    ${
      question.incorrect_answers.some(
        (wrong_answer) => wrong_answer === answer
      ) && question.selectedAnswer === answer
        ? "incorrect-answer"
        : ""
    }
     
     
    `;
    const unmarkedClassName = `${
      question.selectedAnswer === answer ? "answer-selected" : ""
    }`;

    return (
      <div
        key={nanoid()}
        className={`answer ${
          isGameEnded ? markedAnswerClassName : unmarkedClassName
        } `}
        onClick={(e) => {
          handleClick(e, question.question_id, answer);
        }}
      >
        {decode(answer)}
      </div>
    );
  });

  return (
    <div className="question-with-answers">
      <h4 className="question">{decode(question.question)}</h4>
      <div className="all-answers">{printAnswersToQuestion}</div>
      <div className="separating-line"></div>
    </div>
  );
}

export default Question;
