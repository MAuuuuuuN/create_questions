import styles from './css/SelectDisplay.module.css';

export default function SelectDisplay({ quizIndex, selectData, radioRefs }) {
  const selectParse = JSON.parse(selectData);

  return (
    <>
      <fieldset>
        <ul className={styles.problem_list}>
          {selectParse.map((select, index) => (
            <li key={index}>
              <label>
                <input name={quizIndex} type="radio" ref={(el) => (radioRefs.current[index] = el)} value={select}/>
                <p>{select}</p>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  )
}