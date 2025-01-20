import ProblemDisplay from './ProblemDisplay.jsx';
import SelectDisplay from './SelectDisplay.jsx';
import AnswerDisplay from './AnswerDisplay.jsx';

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