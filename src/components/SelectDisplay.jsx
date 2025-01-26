// import { useContext, useEffect } from 'react';
import styles from './css/SelectDisplay.module.css';
// import { answerContext } from './QuizContext.jsx';

export default function SelectDisplay({ selectData, quizIndex }) {

  return (
    <>
      <fieldset>
        <ul className={styles.problem_list}>
          {selectData.map((select) => (
            <li key={select.optionId}>
              <label htmlFor={select.optionId}>
                <input type="radio" id={select.optionId} name={quizIndex} />
                <p>{select.option}</p>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  )
}