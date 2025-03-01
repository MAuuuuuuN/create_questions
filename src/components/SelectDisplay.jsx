import { useState } from 'react';

import styles from './css/SelectDisplay.module.css';

export default function SelectDisplay({ quizIndex, selectData, onCheckChange }) {
  const selectParse = JSON.parse(selectData);
  const [checkedValue, setChackedValue] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    onCheckChange(value);
    setChackedValue(value);
  };

  return (
    <>
      <fieldset>
        <ul className={styles.problem_list}>
          {selectParse.map((select, index) => (
            <li key={index} className={checkedValue === select ? styles.checked : ""}>
              <label className={styles.selectLabel}>
                <input
                  name={quizIndex}
                  type="radio"
                  value={select}
                  onChange={handleChange}
                />
                <p>{select}</p>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  )
}