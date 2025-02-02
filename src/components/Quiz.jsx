import QuestionDisplay from './QuestionDisplay.jsx';
import SelectDisplay from './SelectDisplay.jsx';
import AnswerDisplay from './AnswerDisplay.jsx';
import styles from './css/Quiz.module.css';

export default function Quiz({ quizData, quizIndex, isShowAnswer }) {
  return (
    <div className={styles.quiz}>
      <QuestionDisplay questionData={quizData.question} quizIndex={quizIndex} />
      <SelectDisplay selectData={quizData.selects} quizIndex={quizIndex} isShowAnswer={isShowAnswer} />
      <AnswerDisplay answerData={quizData.answer} isShowAnswer={isShowAnswer} quizIndex={quizIndex} />
    </div>
  );
}