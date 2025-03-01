import { useContext, useState } from 'react';
import { resultContext } from './QuizContext.jsx';

import { addSelect } from '../http.js';
import styles from './css/Answer.module.css';

export default function AnswerDisplay({ titleData, answerData, questionId, onCheckChange }) {
  const { setResult } = useContext(resultContext);
  const [buttonLabel, setButtonLabel] = useState(null);

  const handleClick = async () => {
    const isCorrect = onCheckChange === answerData;
    const questionResult = {
      question: titleData,
      correct: isCorrect,
      answer: answerData,
      select: onCheckChange,
    }

    setResult((prev) => {
      return [...prev, questionResult]
    });
    setButtonLabel(isCorrect ? '正解' : '不正解');

    try {
      await addSelect(questionId, isCorrect, onCheckChange);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.answer}>
        {buttonLabel != null ? (
          <>
            <div className={buttonLabel === "正解" ? styles.true : styles.false}>
              <p>{buttonLabel}</p>
            </div>
            <p>正解の選択肢 : {answerData}</p>
          </>
        ) : <button onClick={handleClick} className={onCheckChange !== null ? styles.showAnswerAble : styles.showAnswerDisable}>正解を表示する</button>}
      </div>
    </>
  )
}