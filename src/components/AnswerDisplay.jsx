import { useContext, useState } from 'react';
import { resultContext } from './QuizContext.jsx';

import { addSelect } from '../http.js';
import styles from './css/Answer.module.css';

export default function AnswerDisplay({ answerData, radioRefs, questionId }) {
  const { setResult } = useContext(resultContext);
  const [buttonLabel, setButtonLabel] = useState(null);

  const handleClick = async () => {
    const selectedRadio = radioRefs.current.find(
      (radio) => radio && radio.checked
    );

    if (!selectedRadio) {
      alert("選択してください");
      return;
    }

    const isCorrect = selectedRadio.value === answerData;

    setResult((prev) => {
      return [...prev, isCorrect]
    });
    setButtonLabel(isCorrect ? '正解' : '不正解');

    console.log(questionId);
    console.log(isCorrect);
    console.log(selectedRadio.value);

    try {
      await addSelect(questionId, isCorrect, selectedRadio.value);
    } catch (error) {
      console.log(error);
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
        ) : <button onClick={handleClick} className={styles.showAnswer}>正解を表示する</button>}
      </div>
    </>
  )
}