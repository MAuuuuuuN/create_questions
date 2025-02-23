import { useRef, useState } from 'react';

import styles from './css/QuizSetting.module.css';

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();
  const [isComposing, setIsComposing] = useState(false);

  function setting_prompt() {
    onButtonClick(questionSet.current.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !isComposing) {
      setting_prompt();
    }
  }

  function handleCompositionStart() {
    setIsComposing(true);
  }

  function handleCompositionEnd() {
    setIsComposing(false);
  }

  return (
    <div>
      <h1>Generate Quiz by Gemini AI</h1>
      <input className={styles.input} onKeyDown={handleKeyDown} onCompositionStart={handleCompositionStart} onCompositionEnd={handleCompositionEnd} type="text" placeholder="例:HTML,CSS,JavaScript etc..." ref={questionSet}></input>
      <button onClick={setting_prompt} className={styles.button}>作成</button>
    </div>
  )
}