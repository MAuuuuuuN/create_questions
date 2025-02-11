import { useRef } from 'react';

import QuestionDisplay from './QuestionDisplay.jsx';
import SelectDisplay from './SelectDisplay.jsx';
import AnswerDisplay from './AnswerDisplay.jsx';
import styles from './css/Quiz.module.css';

export default function Quiz({ quizIndex, questionData }) {
  const radioRefs = useRef([]);

  return (
      <div className={`${styles.quiz}`} id="quiz">
        <QuestionDisplay quizIndex={quizIndex} titleData={questionData.question} />
        <SelectDisplay quizIndex={quizIndex} selectData={questionData.selects} radioRefs={radioRefs} />
        <AnswerDisplay answerData={questionData.answer} radioRefs={radioRefs} />
      </div>
  );
}