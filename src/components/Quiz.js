import ProblemDisplay from './ProblemDisplay.js';
import SelectDisplay from './SelectDisplay.js';
import AnswerDisplay from './AnswerDisplay.js';

export default function Quiz({ quizData, quizIndex, isShowAnswer }) {
  return (
    <>
      <div>
        <ProblemDisplay problemData={quizData.question} quizIndex={quizIndex} />
        <SelectDisplay selectData={quizData.select} quizIndex={quizIndex} />
        <AnswerDisplay answerData={quizData.answer} isShowAnswer={isShowAnswer} />
      </div>
    </>
  );
}