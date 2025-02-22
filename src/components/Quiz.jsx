import { useRef } from 'react';

import QuestionDisplay from './QuestionDisplay.jsx';
import SelectDisplay from './SelectDisplay.jsx';
import AnswerDisplay from './AnswerDisplay.jsx';
import styles from './css/Quiz.module.css';

export default function Quiz({ quizIndex, questionData }) {
  const radioRefs = useRef([]);

  return (
      <div className={`${styles.quiz}`} id="quiz">
        {/* 問題を表示 */}
        <QuestionDisplay quizIndex={quizIndex} titleData={questionData.question} />
        {/* 選択肢を表示 */}
        <SelectDisplay quizIndex={quizIndex} selectData={questionData.selects} radioRefs={radioRefs} />
        {/* 答えを表示 */}
        <AnswerDisplay answerData={questionData.answer} radioRefs={radioRefs} questionId={questionData.questionId} />
      </div>
  );
}