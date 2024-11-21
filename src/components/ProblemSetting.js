import { useState } from 'react';

import styles from './ProblemSetting.module.css';

export default function ProblemSetting({ onButtonClick }) {
  const [inputValue, setInputValue] = useState('');

  function setting_prompt() {
    onButtonClick(inputValue);
  }

  return (
    <div>
      <p>出題する問題を入力</p>
      <input className={styles.input} type="text" placeholder="例:HTML,CSS,JavaScript etc.." onChange={(e) => setInputValue(e.target.value)}></input>
      <button onClick={setting_prompt}>作成</button>
    </div>
  )
}