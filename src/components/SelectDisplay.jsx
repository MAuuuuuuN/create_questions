import styles from './css/SelectDisplay.module.css';

export default function SelectDisplay({ selectData, quizIndex }) {
  return (
    <>
      <fieldset>
        <ul className={styles.problem_list}>
          {selectData.map((select) => (
            <li key={select.optionId}>
              <label htmlFor={select.optionId}>
                <input type="radio" id={select.optionId} name={quizIndex} />
                {select.option}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  )
}