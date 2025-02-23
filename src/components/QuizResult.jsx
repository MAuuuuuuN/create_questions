import { useContext } from 'react';
import { resultContext } from './QuizContext.jsx';

import styles from './css/Result.module.css';

export default function QuizResult() {
  const { result } = useContext(resultContext);
  const totalQuestions = result.length;
  const totalCorrect = result.reduce((correctTotal, question) => {
    if (question.correct === true) {
      return correctTotal + 1;
    } else {
      return correctTotal;
    }
  }, 0);

  return (
    <>
      <div className={styles.result}>
        <h1 className={styles.title}>リザルト</h1>
        <p className={styles.detail}>{totalQuestions}問中{totalCorrect}正解</p>
        {result.map((questionResult, index) => {
          return (
            <div key={index} className={styles.question}>
              <p className={styles.questionNumber}>{index + 1}問目</p>
              <p className={styles.questionTitle}>{questionResult.question}</p>
              <div className={styles.correct}>
                <p>正解 : {questionResult.answer}</p>
                <p className={questionResult.correct ? styles.correctSelect : styles.incorrectSelect}>あなたの答え : {questionResult.select}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}