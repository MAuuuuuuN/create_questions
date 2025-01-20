import { useRef } from 'react';

import styles from './css/QuizSetting.module.css';

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();

  function setting_prompt() {
    onButtonClick(questionSet.current.value);
  }

  return (
    <div>
      <p>出題する問題を入力</p>
      <input className={styles.input} type="text" placeholder="例:HTML,CSS,JavaScript etc.." ref={questionSet}></input>
      <button onClick={setting_prompt}>作成</button>
    </div>
  )
}