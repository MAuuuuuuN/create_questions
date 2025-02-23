import { useRef } from 'react';
import { TextInput, Button } from '@mantine/core';

import styles from './css/QuizSetting.module.css';

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();

  function setting_prompt() {
    onButtonClick(questionSet.current.value);
  }

  return (
    <div>
      <h1>Generate Quiz by Gemini AI</h1>
      <input className={styles.input} type="text" placeholder="例:HTML,CSS,JavaScript etc.." ref={questionSet}></input>
      {/* <TextInput size="md" radius="xs" label="出題する問題を入力" description="例:HTML,CSS,JavaScript etc..." ref={questionSet} /> */}
      <button onClick={setting_prompt} className={styles.button}>作成</button>
      {/* <Button variant="filled" onClick={setting_prompt} className={styles.button}>問題を作成する</Button> */}
    </div>
  )
}