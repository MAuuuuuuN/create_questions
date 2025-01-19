import styles from './ProblemDisplay.module.css';

export default function SelectDisplay({ selectData, quizIndex }) {
  return (
    <>
      <fieldset>
        
        <ul className={styles.problem_list}>
          {selectData.map((select) => (
            <li key={select.selectId}>
              <label htmlFor={select.selectId}>
                <input type="radio" id={select.selectId} name={quizIndex} />
                {select.select}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

    </>
  )
}